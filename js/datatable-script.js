async function initData() { // asynchronous function to initialize data
    "use strict";
    var timelineRes = await fetch("https://covid19-api.org/api/timeline"); // fetch timeline data
    var timelineData = await timelineRes.json();
    world = { // make a world object
        country: "World",
        name: "World",
        last_update: timelineData[0].last_update,
        cases: timelineData[0].total_cases,
        deaths: timelineData[0].total_deaths,
        recovered: timelineData[0].total_recovered,
        active: timelineData[0].total_cases - (timelineData[0].total_deaths + timelineData[0].total_recovered)
    };
    
    var statusRes = await fetch("https://covid19-api.org/api/status"); // get status
    var statusData = await statusRes.json();
    var countriesRes = await fetch("https://covid19-api.org/api/countries"); // get countries
    var countriesData = await countriesRes.json();
    var countryArray = [];

    statusData.map((s) => {
        countriesData.map((c) => {
            if (c.alpha2 == s.country) { // include both country data and active data into a country object
                var country = Object.assign(s, c, {active: s.cases - (s.deaths + s.recovered)}); 
                delete country["alpha2"];
                countryArray.push(country); // push each country into a country array
            }
        });
    });
    dataArray = [world, ...countryArray]; // assign world and countries into global variable dataArray
    displayTotal(dataArray); // call displayTotal function
}

function displayTotal(array) { // display total data
    $("#entries").html(""); // clear entries from table
    $("#dataDate").html(new Date(dataArray[0].last_update).toDateString()); // update the table data date
    $(".casesTab").html("Total Cases"); // change table heading names
    $(".deathsTab").html("Total Deaths");
    $(".recoveredTab").html("Total Recovered");

    if ($(window).width() < 580) $(".activeCase").hide(); // if window size is less than 580, hide active case tab
    else $(".activeCase").show();

    array.map((i) => { // append total data entry into html
        $("#entries").append(`
        <tr style="background-color:#F5F5F5; border-top: 1px solid #444;">
            <td class="index">${array.indexOf(i) + 1}</td>
            <td class="countryName">${i.name}</td>
            <td class="countryCode">${i.country}</td>
            <td class="cases">${i.cases}</td>
            <td class="deaths">${i.deaths}</td>
            <td class="recovered">${i.recovered}</td>
            <td class="activeCase">${i.active}</td>
        </tr>
        `);
    });
}

function loadNew() { // load new data
    $("#entries").html(""); // clear entries from table
    $(".casesTab").html("New Cases");
    $(".deathsTab").html("New Deaths");
    $(".recoveredTab").html("New Recovered");
    $(".activeCase").hide(); // hide active cases

    countryArray = [];
    Object.assign(world, {new_cases: 0}, {new_deaths: 0}, {new_recovered: 0}); // add new cases, deaths and recovered into the world object

    fetch("https://covid19-api.org/api/diff") // get difference from yesterday data
    .then(response => response.json())
    .then(diffData => {
        dataArray.map((c) => {
            diffData.map((d) => {
                if (c.country == d.country) { // for each country, assign the new data into the object
                    c['new_cases'] = d.new_cases;
                    c['new_deaths'] = d.new_deaths;
                    c['new_recovered'] = d.new_recovered;
                    countryArray.push(c); // push the object into the country array

                    world['new_cases'] += d.new_cases; // add the new data into the world object for total difference
                    world['new_deaths'] += d.new_deaths;
                    world['new_recovered'] += d.new_recovered;
                }
            });
        });
        displayNew([world, ...countryArray]); // call the display new data function
    });
}

function displayNew(array) {
    $("#entries").html(""); // clear entries from table
    $("#dataDate").html(new Date(array[0].last_update).toDateString()); // update the table data date
    $(".casesTab").html("New Cases");
    $(".deathsTab").html("New Deaths");
    $(".recoveredTab").html("New Recovered");
    $(".activeCase").hide();

    array.map((i) => { // append new data entry into html
        $("#entries").append(`
        <tr style="background-color:#F5F5F5; border-top: 1px solid #444;">
            <td class="index">${array.indexOf(i) + 1}</td>
            <td class="countryName">${i.name}</td>
            <td class="countryCode">${i.country}</td>
            <td class="cases">${i.new_cases}</td>
            <td class="deaths">${i.new_deaths}</td>
            <td class="recovered">${i.new_recovered}</td>
        </tr>
        `);
    });
}

function checkSort(order, count) { // check which sort to use
    if (count == 0) {
        sortData(order, false);
        return count = 1;
    }

    else {
        sortData(order, true);
        return count = 0;
    }
}

function sortData(order, reverse) { // sort the table data
    switch(order) {
        case "byCountry": // sort by country alphabetically
            dataArray.sort(function(a, b) {
                if (a.name < b.name) return -1;
                else if (a.name > b.name) return 1;
                return 0;
            });
            break;

        case "byCountryCode": // sort by country code alphabetically
            dataArray.sort(function(a, b) {
                if (a.country < b.country) return -1;
                else if (a.country > b.country) return 1;
                return 0;
            });
            break;
        
        case "byCase": // sort by case numerically
            if ($('#totalBtn').is(':checked')) {
                dataArray.sort(function(a, b) { 
                    return b.cases - a.cases;
                });
            }
            else {
                dataArray.sort(function(a, b) { 
                    return b.new_cases - a.new_cases;
                });
            }
            break;

        case "byDeaths":  // sort by deaths numerically
            if ($('#totalBtn').is(':checked')) {
                dataArray.sort(function(a, b) { 
                    return b.deaths - a.deaths;
                });
            }
            else {
                dataArray.sort(function(a, b) { 
                    return b.new_deaths - a.new_deaths;
                });
            }
            break;

        case "byRecovered":  // sort by recovered numerically
            if ($('#totalBtn').is(':checked')) {
                dataArray.sort(function(a, b) {
                    return b.recovered - a.recovered;
                });
            }
            else {
                dataArray.sort(function(a, b) {
                    return b.new_recovered - a.new_recovered;
                });
            }
            break;

        case "byActive":  // sort by active cases numerically
            dataArray.sort(function(a, b) {
                return b.active - a.active;
            });
            break;
    }

    if (reverse == true) dataArray.reverse(); // if reverse is true, data array whill be reversed to reproduce descending result

    if ($('#totalBtn').is(':checked')) displayTotal(dataArray);
    else displayNew(dataArray);
}

// global variables
var dataArray = [];
var world = {};

// start of main program
$(document).ready(function() {
    initData(); // call initialize data function

    // user can click between total or new data
    $("#totalBtn").click(function() { // if user clicks total, display total data
        displayTotal(dataArray);
    });

    $("#newBtn").click(function() { // if user clicks new, display new data
        if (!(dataArray[0].hasOwnProperty("new_cases"))) return loadNew(); // if the dataArray world does not have attribute new_cases, load new data into object
        else displayNew(dataArray);
    });

    $("#searchBar").keyup(function(e) { // search bar
        var searchString = e.target.value.toLowerCase(); // find input value and turn it into lower case
        var filteredCountries = dataArray.filter((c) => { // filter dataArray and include only input value
            return (
                c.name.toLowerCase().includes(searchString) || // user can search by name
                c.country.toLowerCase().includes(searchString) // user can also search by country code
            );
        });

        // reload data with the filtered countries
        if ($('#totalBtn').is(':checked')) displayTotal(filteredCountries);
        else displayNew(filteredCountries);
    });

    $("form").submit(function() { // disable refresh when user press enter.
        return false;
    });

    // table heading click to sort function
    var count = 0; // count used for keeping track of number of clicks
    $("#countryButton").click(function() { 
        count = checkSort("byCountry", count);
    });

    $("#countryCodeButton").click(function() { 
        count = checkSort("byCountryCode", count);
    });

    $("#caseButton").click(function() { 
        count = checkSort("byCase", count);
    });

    $("#deathsButton").click(function() {
        count = checkSort("byDeaths", count);
    });

    $("#recoveredButton").click(function() {
        count = checkSort("byRecovered", count);
    });

    $("#activeCaseButton").click(function() {
        count = checkSort("byActive", count);
    });
});