const entries = document.getElementById("entries");
let dataArray = [];

$(document).ready(function() {
    loadData();
    var order = false;
    $(".header").change(function(e) { order = false })

    $("#countryButton").click(function() {
        if (order == true) {
            sortData("byCountry", true);
            order = false;
        }

        else {
            sortData("byCountry", false);
            order = true;
        }
    })

    $("#countryCodeButton").click(function() {
        if (order == true) {
            sortData("byCountryCode", true);
            order = false;
        }

        else {
            sortData("byCountryCode", false);
            order = true;
        }
    })

    $("#totalCaseButton").click(function() {
        if (order == true) {
            sortData("byCase", true);
            order = false;
        }
        
        else {
            sortData("byCase", false);
            order = true;
        }
    })

    $("#totalDeathsButton").click(function() {
        if (order == true) {
            sortData("byDeaths", true);
            order = false;
        }
        
        else {
            sortData("byDeaths", false);
            order = true;
        }
    })

    $("#totalRecoveredButton").click(function() {
        if (order == true) {
            sortData("byRecovered", true);
            order = false;
        }
        
        else {
            sortData("byRecovered", false);
            order = true;
        }
    })

    $("#activeCaseButton").click(function() {
        if (order == true) {
            sortData("byActive", true);
            order = false;
        }
        
        else {
            sortData("byActive", false);
            order = true;
        }
    })
});

const loadData = async() => {
    const statusRes = await fetch("https://covid19-api.org/api/status");
    const countryStatus = await statusRes.json();

    promiseArray = countryStatus.map(async (c) => {
        const countryRes = await fetch("https://covid19-api.org/api/country/" + c.country);
        const countryInfo = await countryRes.json();
        return Promise.all([countryInfo.name, c])
    })

    Promise.all(promiseArray).then(promisedArray => {
        displayPromiseData(promisedArray);
    })
}

const displayPromiseData = (array) => {
    var i = 0;
    dataArray = array;
    dataArray.forEach(data => {
        var htmlString = [
            `<tr>`,
            `<td scope="row">${i += 1}</td>`,
            `<td>${data[0]}</td>`,
            `<td>${data[1].country}</td>`,
            `<td>${data[1].cases}</td>`,
            `<td>${data[1].deaths}</td>`,
            `<td>${data[1].recovered}</td>`,
            `<td>${data[1].cases - (data[1].deaths + data[1].recovered)}</td>`,
            `</tr>`
        ]
        entries.innerHTML += htmlString.join('').replace(',','')
    })
}

function sortData(order, mode) {
    entries.innerHTML = "";

    dataArray.sort(function(a,b) {
        switch(order) {
            case "byCountry":
                if (a[0] < b[0]) { return -1; }
                if (a[0] > b[0]) { return 1; }
                return 0;

            case "byCountryCode":
                if (a[1].country < b[1].country) { return -1; }
                if (a[1].country > b[1].country) { return 1; }
                return 0;
                
            case "byCase":
                return b[1].cases - a[1].cases;

            case "byDeaths":
                return b[1].deaths - a[1].deaths;
            
            case "byRecovered":
                return b[1].recovered - a[1].recovered;

            case "byActive":
                return (b[1].cases - (b[1].deaths + b[1].recovered)) - (a[1].cases - (a[1].deaths + a[1].recovered));
        }
    });

    if (mode == true) {
        dataArray.reverse();
    }
    
    displayPromiseData(dataArray);
}
