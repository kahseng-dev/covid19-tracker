$(document).ready(function() {
    loadData();

    $("#updateData").on("click", function() { // when user clicks refresh button, reload data.
        loadData();
    })
});

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

function findInfectedCountries() {
    var infectedCountries = 0;

    fetch("https://covid19-api.org/api/status")
    .then(response => response.json())
    .then(function(data) {
        data.map((d) => {
            var activeCases = d.cases - (d.deaths + d.recovered);
            if (activeCases >= 1) {
                infectedCountries += 1;
            }
        });
        $("#country-data").html(infectedCountries);
        $("#total-country").html(data.length);
    });

    loadAritcles();
}

function loadAritcles() { // Use localhost to view.
    const apiKey = '9cab93aa8f544d4bb8ec422c57e2a1d5';
    let topic = "COVID-19";
    var url = `http://newsapi.org/v2/everything?q=${topic}&pageSize=10&apiKey=${apiKey}`
    
    fetch(url)
    .then((res) => { return res.json() })
    .then((data) => {
        console.log(data.articles);
        var articles = data.articles;
        articles.map((a) => {
            $(".news-group").append(`
                <div class="card">
                    <div class="center-cropped" style="background-image: url('${a.urlToImage}');"></div>
                    <div class="card-body">
                        <h5 class="card-title">${a.title}</h5>
                        <p class="card-text">${a.description}</p>
                        <a href="${a.url}" target="_blank" class="btn btn-warning">View Article</a>
                    </div>
                </div>
            `)
        })
    })

    //.catch(err => console.log("Please use localhost to view News"))
}