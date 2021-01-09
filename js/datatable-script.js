let dataArray = [];
var world = {};

$(document).ready(function() {
    initData();

    $("#totalBtn").click(function() {
        displayTotal(dataArray);
    });

    $("#newBtn").click(function() {
        if (!(dataArray[0].hasOwnProperty("new_cases"))) {
            return loadNew();
        } else {
            displayNew(dataArray);
        }
    });

    $("#searchBar").keyup(function(e) {
        const searchString = e.target.value.toLowerCase();
        const filteredCountries = dataArray.filter((c) => {
            console.log(c)
            return (
                c.name.toLowerCase().includes(searchString) ||
                c.country.toLowerCase().includes(searchString)
            );
        });

        if ($('#totalBtn').is(':checked')) {
            displayTotal(filteredCountries);
        } else {
            displayNew(filteredCountries);
        }
    });

    $("form").submit(function() { return false; }); // disable refresh when user press enter.

    var count = 0;
    $(".headerButtons").change(function() { count = 0; }); // reset count when user switches to another table tab

    $("#countryButton").click(function() { count = checkSort("byCountry", count) });
    $("#countryCodeButton").click(function() { count = checkSort("byCountryCode", count) });
    $("#caseButton").click(function() { count = checkSort("byCase", count) });
    $("#deathsButton").click(function() { count = checkSort("byDeaths", count) });
    $("#recoveredButton").click(function() { count = checkSort("byRecovered", count) });
    $("#activeCaseButton").click(function() { count = checkSort("byActive", count); });
});

async function initData() {
    const timelineRes = await fetch("https://covid19-api.org/api/timeline");
    const timelineData = await timelineRes.json();
    
    world = {            
        country: "World",
        name: "World",
        last_update: timelineData[0].last_update,
        cases: timelineData[0].total_cases,
        deaths: timelineData[0].total_deaths,
        recovered: timelineData[0].total_recovered,
        active: timelineData[0].total_cases - (timelineData[0].total_deaths + timelineData[0].total_recovered)
    }
    
    const statusRes = await fetch("https://covid19-api.org/api/status");
    const statusData = await statusRes.json();
    
    const countriesRes = await fetch("https://covid19-api.org/api/countries");
    const countriesData = await countriesRes.json();

    var countryArray = [];
    statusData.map((s) => {
        countriesData.map((c) => { 
            if (c.alpha2 == s.country) {
                var country = Object.assign(
                    s, c, {active: s.cases - (s.deaths + s.recovered)});
                delete country["alpha2"];
                countryArray.push(country);
            }
        })
    })

    dataArray = [world, ...countryArray];
    displayTotal(dataArray);
}

function displayTotal(array) {
    $("#entries").html("")

    $(".casesTab").html("Total Cases");
    $(".deathsTab").html("Total Deaths");
    $(".recoveredTab").html("Total Recovered");
    $(".activeCase").show();
    $("#dataDate").html(new Date(array[0].last_update).toDateString())
   
    array.map((i) => {
        $("#entries").append(`
        <tr style="background-color:#F5F5F5; border-top: 1px solid #444;">
            <td class="index">${array.indexOf(i) + 1}</td>
            <td class="countryName">${i.name}</td>
            <td class="countryCode">${i.country}</td>
            <td class="cases">${i.cases}</td>
            <td class="deaths">${i.deaths}</td>
            <td class="recovered">${i.recovered}</td>
            <td class="activeData">${i.active}</td>
        </tr>
        `)
    })
}

function loadNew() {
    $("#entries").html("");
    $(".casesTab").html("New Cases");
    $(".deathsTab").html("New Deaths");
    $(".recoveredTab").html("New Recovered");
    $(".activeCase").hide();

    fetch("https://covid19-api.org/api/diff")
    .then(response => response.json())
    .then(diffData => {
        var countryArray = [];
        world['new_cases'] = 0;
        world['new_deaths'] = 0;
        world['new_recovered'] = 0;

        dataArray.map((c) => {
            diffData.map((d) => {
                if (c.country == d.country) {
                    c['new_cases'] = d.new_cases;
                    c['new_deaths'] = d.new_deaths;
                    c['new_recovered'] = d.new_recovered;
                    
                    world['new_cases'] += d.new_cases;
                    world['new_deaths'] += d.new_deaths;
                    world['new_recovered'] += d.new_recovered;

                    countryArray.push(c);
                }
            })
        })
        displayNew([world, ...countryArray]);
    })
}

function displayNew(array) {
    $("#entries").html("");
    $("#dataDate").html(new Date(array[0].last_update).toDateString())
    
    $(".casesTab").html("New Cases");
    $(".deathsTab").html("New Deaths");
    $(".recoveredTab").html("New Recovered");
    $(".activeCase").hide();

    array.map((i) => {
        $("#entries").append(`
        <tr style="background-color:#F5F5F5; border-top: 1px solid #444;">
            <td class="index">${array.indexOf(i) + 1}</td>
            <td class="countryName">${i.name}</td>
            <td class="countryCode">${i.country}</td>
            <td class="cases">${i.new_cases}</td>
            <td class="deaths">${i.new_deaths}</td>
            <td class="recovered">${i.new_recovered}</td>
        </tr>
        `)
    })
}

function checkSort(order, count) {
    if (count == 0) {
        sortData(order, false);
        return count = 1;
    } else {
        sortData(order, true);
        return count = 0;
    }
}

function sortData(order, reverse) {
    switch(order) {
        case "byCountry":
            dataArray.sort(function(a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            });
            break;

        case "byCountryCode":
                dataArray.sort(function(a, b) {
                if (a.country < b.country) { return -1; }
                if (a.country > b.country) { return 1; }
                return 0;
            });
            break;
        
        case "byCase":
            if ($('#totalBtn').is(':checked')) {
                dataArray.sort(function(a, b) { 
                    return b.cases - a.cases 
                });
            }
            else {
                dataArray.sort(function(a, b) { 
                    return b.new_cases - a.new_cases 
                });
            }
            break;

        case "byDeaths":
            if ($('#totalBtn').is(':checked')) {
                dataArray.sort(function(a, b) { 
                    return b.deaths - a.deaths 
                });
            }
            else {
                dataArray.sort(function(a, b) { 
                    return b.new_deaths - a.new_deaths
                });
            }
            break;

        case "byRecovered":
            if ($('#totalBtn').is(':checked')) {
                dataArray.sort(function(a, b) {
                    return b.recovered - a.recovered 
                });
            }
            else {
                dataArray.sort(function(a, b) {
                    return b.new_recovered - a.new_recovered
                });
            }
            break;

        case "byActive": 
            dataArray.sort(function(a, b) { return b.active - a.active });
            break;
    }

    if (reverse == true) {
        dataArray.reverse()
    }

    if ($('#totalBtn').is(':checked')) { displayTotal(dataArray) }
    else { displayNew(dataArray) }
}