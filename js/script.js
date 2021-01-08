function findInfectedCountries(data) {
    var noInfectedCountries = 0;
    for (c of data.Countries) {
        var activeCases = c.TotalConfirmed - c.TotalDeaths - c.TotalRecovered;
        if (activeCases >= 1) {
            noInfectedCountries += 1;
        }
    }
    return noInfectedCountries;
}

let url = 'https://api.covid19api.com/summary';

$(document).ready(function() {
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        var global = data.Global;

        // label date of data
        $("#data-date").html(new Date(data.Date).toDateString());
        
        // insert total cases
        $("#confirmed-data").html(`${global.TotalConfirmed}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#deaths-data").html(`${global.TotalDeaths}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#recovered-data").html(`${global.TotalRecovered}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        
        // insert new cases
        $("#new-confirmed-data").html(`${global.NewConfirmed}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#new-deaths-data").html(`${global.NewDeaths}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#new-recovered-data").html(`${global.NewRecovered}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        // insert global active cases
        var activeData = global.TotalConfirmed - (global.TotalDeaths + global.TotalRecovered);
        $("#active-data").html(`${activeData}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        // insert countries infected
        $("#country-data").html(findInfectedCountries(data));
        $("#total-country").html(data.Countries.length);
    })
});