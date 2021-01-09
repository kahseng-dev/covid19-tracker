function loadData() {
    "use strict";
    fetch("https://covid19-api.org/api/timeline") // fetch timeline data
    .then(response => response.json())
    .then(function(data) {
        $("#data-date").html(new Date(data[0].last_update).toDateString()); // insert the date of data
        
        // display total cases
        $("#confirmed-data").html(`${data[0].total_cases}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); 
        $("#deaths-data").html(`${data[0].total_deaths}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#recovered-data").html(`${data[0].total_recovered}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        
        // display new cases from the difference of the previous day entry
        $("#new-confirmed-data").html(`${data[0].total_cases - data[1].total_cases}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#new-deaths-data").html(`${data[0].total_deaths - data[1].total_deaths}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#new-recovered-data").html(`${data[0].total_recovered - data[1].total_recovered}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        // display global active cases
        var activeData = data[0].total_cases - (data[0].total_deaths + data[0].total_recovered);
        $("#active-data").html(`${activeData}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        findInfectedCountries(); // find number of countries infected
    });
}

function findInfectedCountries() {
    var infectedCountries = 0;
    fetch("https://covid19-api.org/api/status") // fetch the status data
    .then(response => response.json())
    .then(function(data) {
        data.map((d) => { 
            var activeCases = d.cases - (d.deaths + d.recovered); // finding if there is atleast one active case in a country
            if (activeCases >= 1) infectedCountries += 1; // if there is, increase infected countries variable by 1
        });

        $("#country-data").html(infectedCountries); // insert infected countries
        $("#total-country").html(data.length); // insert out of total number of countries given by api data
    });

    loadAritcles(); // move to load article function
}

function loadAritcles() { // Noted: please use localhost to view.
    const apiKey = '48bca8c56bd4859a1472b7a8218c0053';
    let topic = "COVID-19";
    var url = `https://gnews.io/api/v4/search?q="${topic}"&lang=en&token=${apiKey}`;
    
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        var articles = data.articles;
        articles.map((a) => { // append news article cards into news section
            $(".news-group").append(`
                <div class="card">
                    <div class="center-cropped" style="background-image: url('${a.image}');"></div>
                    <div class="card-body">
                        <h5 class="card-title">${a.title}</h5>
                        <p class="card-text">${a.description}</p>
                        <a href="${a.url}" target="_blank" class="btn btn-warning">View Article</a>
                    </div>
                </div>
            `);
        });
    });
}

$(document).ready(function() { // start of main program
    loadData(); // inital load data on web load
    
    $("#updateData").on("click", function() { // if user clicks the refresh button, reload data.
        loadData();
    });
});