const entries = document.getElementById("entries");
let dataArray = [];

$(document).ready(function() {
    loadData();
    let count = 0;

    $(".headerButtons").change(function(e) { count = 0; }) // reset count when user switches to another table tab

    $("#countryButton").click(function() { count = checkSort("byCountry", count) })
    $("#countryCodeButton").click(function() { count = checkSort("byCountryCode", count) })
    $("#totalCaseButton").click(function() { count = checkSort("byCase", count) })
    $("#totalDeathsButton").click(function() { count = checkSort("byDeaths", count) })
    $("#totalRecoveredButton").click(function() { count = checkSort("byRecovered", count) })
    $("#activeCaseButton").click(function() { count = checkSort("byActive", count); })

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredCountries = dataArray[1].filter(c => {
            return (
                c.alpha3.toLowerCase().includes(searchString) ||
                c.name.toLowerCase().includes(searchString) ||
                c.country.toLowerCase().includes(searchString)
            );
        })
        displayData([dataArray[0], filteredCountries]);
    })
    $("form").submit(function() { return false; }); // disable refresh when user press enter.
});

function checkSort(order, count) {
    if (count == 0) {
        sortData(order, false);
        return count = 1;
    } else {
        sortData(order, true);
        return count = 0;
    }
}

async function loadData() {
    const worldRes = await fetch("https://covid19-api.org/api/timeline");
    const worldData = await worldRes.json();
    
    const statusRes = await fetch("https://covid19-api.org/api/status");
    const countryStatus = await statusRes.json();
    
    const countriesRes = await fetch("https://covid19-api.org/api/countries");
    const countriesData = await countriesRes.json();

    var world = {
        name: "World",
        last_update: worldData[0].last_update,
        cases: worldData[0].total_cases,
        deaths: worldData[0].total_deaths,
        recovered: worldData[0].total_recovered,
        active: worldData[0].total_cases - (worldData[0].total_deaths + worldData[0].total_recovered)
    }

    var countryArray = [];
    countryStatus.map((s) => {
        countriesData.map((c) => { 
            if (c.alpha2 == s.country) {
                var country = Object.assign(s, c, {active: s.cases - (s.deaths + s.recovered)});
                delete country["alpha2"];
                countryArray.push(country);
            }
        })
    })

    dataArray = [world, countryArray];
    displayData(dataArray);
}

function displayData(array) {
    var dataDate = document.getElementById("dataDate");
    entries.innerHTML = "";
    dataDate.innerHTML = (new Date(array[0].last_update).toDateString());

    htmlString = (`
    <tr style="background-color:#F5F5F5; border-top: 1px solid #444;">
        <td class="index"></td>
        <td class="countryName">${array[0].name}</td>
        <td class="countryCode">World</td>
        <td class="totalCase">${array[0].cases}</td>
        <td class="totalDeaths">${array[0].deaths}</td>
        <td class="totalRecovered">${array[0].recovered}</td>
        <td class="activeCases">${array[0].active}</td>
    </tr>`
    )
    entries.innerHTML = htmlString

    htmlString = array[1].map((data) => {
        return `
        <tr>
            <td class="index">${array[1].indexOf(data) + 1}</td>
            <td class="countryName">${data.name}</td>
            <td class="countryCode">${data.country}</td>
            <td class="totalCase">${data.cases}</td>
            <td class="totalDeaths">${data.deaths}</td>
            <td class="totalRecovered">${data.recovered}</td>
            <td class="activeCases">${data.active}</td>
        </tr>`
    })
    entries.innerHTML += htmlString.join('')
}

function sortData(order, reverse) {
    switch(order) {
        case "byCountry":
            dataArray[1].sort(function(a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            });
            break;

        case "byCountryCode":
                dataArray[1].sort(function(a, b) {
                if (a.country < b.country) { return -1; }
                if (a.country > b.country) { return 1; }
                return 0;
            });
            break;
            
        case "byCase": 
            dataArray[1].sort(function(a, b) { return b.cases - a.cases });
            break;

        case "byDeaths": 
            dataArray[1].sort(function(a, b) { return b.deaths - a.deaths })
            break;

        case "byRecovered": 
            dataArray[1].sort(function(a, b) { return b.recovered - a.recovered })
            break;

        case "byActive": 
            dataArray[1].sort(function(a, b) { return b.active - a.active })
            break;
    }

    if (reverse == true) { 
        dataArray[1].reverse(); 
    } 

    displayData(dataArray);
}