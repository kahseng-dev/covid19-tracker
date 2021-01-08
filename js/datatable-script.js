const entries = document.getElementById("entries");
let promiseArray = [];

$(document).ready(function() {
    loadData();
    
    $("#countryButton").on("click", function() { sortData(promiseArray, "byCountry") })
    $("#countryCodeButton").on("click", function() { sortData(promiseArray, "byCountryCode") })
    $("#totalCaseButton").on("click", function() { sortData(promiseArray, "byCase") })
    $("#totalDeathsButton").on("click", function() { sortData(promiseArray, "byDeaths") })
    $("#totalRecoveredButton").on("click", function() { sortData(promiseArray, "byRecovered") })
    $("#activeCaseButton").on("click", function() { sortData(promiseArray, "byActive") })
});

const loadData = async() => {
    const statusRes = await fetch("https://covid19-api.org/api/status");
    const countryStatus = await statusRes.json();

    promiseArray = countryStatus.map(async (c) => {
        const countryRes = await fetch("https://covid19-api.org/api/country/" + c.country);
        const countryInfo = await countryRes.json();
        return Promise.all([countryInfo.name, c])
    })

    displayPromiseData(promiseArray);
}

const displayPromiseData = (promiseArray) => {
    var i = 0;

    promiseArray.forEach(promise => {
        promise.then(result => {
            var htmlString = [
                `<tr>`,
                `<td scope="row">${i += 1}</td>`,
                `<td>${result[0]}</td>`,
                `<td>${result[1].country}</td>`,
                `<td>${result[1].cases}</td>`,
                `<td>${result[1].deaths}</td>`,
                `<td>${result[1].recovered}</td>`,
                `<td>${result[1].cases - (result[1].deaths + result[1].recovered)}</td>`,
                `</tr>`
            ]
            entries.innerHTML += htmlString.join('').replace(',','')
        })
    })
}


function sortData(promiseArray, sortOrder) {
    var i = 0;
    entries.innerHTML = "";

    Promise.all(promiseArray).then(dataArray => {
        dataArray.sort(function(a,b) {
            switch(sortOrder) {
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
        dataArray.forEach(result => {
            var htmlString = [
                `<tr>`,
                `<td scope="row">${i += 1}</td>`,
                `<td>${result[0]}</td>`,
                `<td>${result[1].country}</td>`,
                `<td>${result[1].cases}</td>`,
                `<td>${result[1].deaths}</td>`,
                `<td>${result[1].recovered}</td>`,
                `<td>${result[1].cases - (result[1].deaths + result[1].recovered)}</td>`,
                `</tr>`
            ]
            entries.innerHTML += htmlString.join('').replace(',','')
        })
    })
}

