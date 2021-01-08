$(document).ready(function() {
    loadData();

    $("#updateData").on("click", function() { // when user clicks refresh button, reload data.
        loadData();
    })
});

function findInfectedCountries() {
    var infectedCountriesNum = 0;

    fetch("https://covid19-api.org/api/status")
    .then(response => response.json())
    .then(function(data) {
        data.forEach(function(e) {
            var activeCases = e.cases - (e.deaths + e.recovered);
            if (activeCases >= 1) {
                infectedCountriesNum += 1;
            }
        });
        $("#country-data").html(infectedCountriesNum);
        $("#total-country").html(data.length);
    });
}

function loadData() {
    fetch("https://covid19-api.org/api/timeline")
    .then(response => response.json())
    .then(function(data) {
        $("#data-date").html(new Date(data[0].last_update).toDateString()); // label the date of data
        
        // display total cases
        $("#confirmed-data").html(`${data[0].total_cases}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#deaths-data").html(`${data[0].total_deaths}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#recovered-data").html(`${data[0].total_recovered}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        
        // display new cases from previous entry
        $("#new-confirmed-data").html(`${data[0].total_cases - data[1].total_cases}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#new-deaths-data").html(`${data[0].total_deaths - data[1].total_deaths}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#new-recovered-data").html(`${data[0].total_recovered - data[1].total_recovered}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        // display global active cases
        var activeData = data[0].total_cases - (data[0].total_deaths + data[0].total_recovered);
        $("#active-data").html(`${activeData}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        findInfectedCountries(); // find number of countries infected
    })
}