const entries = document.getElementById("entries");
let countryArray = [];

$(document).ready(function() {
    loadData();
    let count = 0;

    $(".headerButtons").change(function(e) { count = 0; }) // reset count when user switches to another tab

    $("#countryButton").click(function() { count = checkSort("byCountry", count) })
    $("#countryCodeButton").click(function() { count = checkSort("byCountryCode", count) })
    $("#totalCaseButton").click(function() { count = checkSort("byCase", count) })
    $("#totalDeathsButton").click(function() { count = checkSort("byDeaths", count) })
    $("#totalRecoveredButton").click(function() { count = checkSort("byRecovered", count) })
    $("#activeCaseButton").click(function() { count = checkSort("byActive", count); })

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredCountries = countryArray.filter(c => {
            return (
                c.alpha3.toLowerCase().includes(searchString) ||
                c.name.toLowerCase().includes(searchString) ||
                c.country.toLowerCase().includes(searchString)
            );
        })
        displayData(filteredCountries);
    })
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
    const statusRes = await fetch("https://covid19-api.org/api/status");
    const countryStatus = await statusRes.json();
    
    const countriesRes = await fetch("https://covid19-api.org/api/countries");
    const countriesData = await countriesRes.json();

    countryStatus.map((s) => {
        countriesData.map((c) => { 
            if (c.alpha2 == s.country) {
                var country = Object.assign(s, c, {"active": s.cases - (s.deaths + s.recovered)});
                delete country["alpha2"];
                countryArray.push(country);
            }
        })
    })

    displayData(countryArray);
}

function displayData(array) {
    entries.innerHTML = "";
    const htmlString = array.map((data) => {
        return `
        <tr>
            <td scope="row">${array.indexOf(data) + 1}</td>
            <td>${data.name}</td>
            <td>${data.country}</td>
            <td>${data.cases}</td>
            <td>${data.deaths}</td>
            <td>${data.recovered}</td>
            <td>${data.active}</td>
        </tr>`
    })
    entries.innerHTML += htmlString.join('').replace(',','')
}

function sortData(order, reverse) {
    switch(order) {
        case "byCountry":
            countryArray.sort(function(a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            });
            break;

        case "byCountryCode":
            countryArray.sort(function(a, b) {
                if (a.country < b.country) { return -1; }
                if (a.country > b.country) { return 1; }
                return 0;
            });
            break;
            
        case "byCase": 
            countryArray.sort(function(a, b) { return b.cases - a.cases });
            break;

        case "byDeaths": 
            countryArray.sort(function(a, b) { return b.deaths - a.deaths })
            break;

        case "byRecovered": 
            countryArray.sort(function(a, b) { return b.recovered - a.recovered })
            break;

        case "byActive": 
            countryArray.sort(function(a, b) { return b.active - a.active })
            break;
    }

    if (reverse == true) { 
        countryArray.reverse(); 
    } 

    displayData(countryArray);
}