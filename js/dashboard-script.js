let searchRegionCode = $(".custom-select option:selected").val() // used for selecting region

$(document).ready(function() {
    // load google visualization API
    google.charts.load("current", {packages: ['corechart', 'geochart'] , mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'});
    updateChart(); // inital chart draw function

    addCountriesToSelect(); // find country data from api and push it to select country option.
    $(".custom-select").on("change", function(e) {
        searchRegionCode = $(".custom-select option:selected").val();
        updateChart();
    });
    
    // due to google chart limitation, it is not responsive. We need to redraw each time the window changes.
    $(window).resize(function() { // create a trigger to resizeEnd event to set a timeout to reduce multiple resize updates
        if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 200); // set to 200 ms
    });
    
    $(window).on('resizeEnd', function() { // when resize is done, charts will update.
        updateChart();
    });
});

function updateChart() {
    google.charts.setOnLoadCallback(drawRegionMap); // call geo chart function
    google.charts.setOnLoadCallback(drawBarChart); // call bar chart function
    google.charts.setOnLoadCallback(drawPieChart); // call pie chart function
    google.charts.setOnLoadCallback(drawLineChart); // call line chart function
}

function addCountriesToSelect() {
    fetch("https://covid19-api.org/api/countries")
    .then(response => response.json())
    .then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $(".custom-select").append(`<option value="${data[i].alpha2}">${data[i].name}</option>`);
        }
    });
}

function drawRegionMap() { // geo chart function
    fetch("https://covid19-api.org/api/status")
    .then(response => response.json())
    .then(function(data) {
        var tableArray = [['Country', 'Total Cases']];
        for (var i = 0; i < data.length; i++) {
            tableArray.push([data[i].country, data[i].cases]);
        }
        
        var options = {
            region: searchRegionCode,
            backgroundColor: 'none',
            datalessRegionColor: '#888',
            colorAxis: {colors: ['#FAFFD8', '#FFBF46', '#EE6055', '#DE3C4B']},
            legend: {textStyle: {color:'#888', auraColor: 'none', fontSize: 16}}
        };
        
        var chart = new google.visualization.GeoChart(document.getElementById('regionMap'));
        chart.draw(google.visualization.arrayToDataTable(tableArray), options);
    });
}

function drawBarChart() { // bar chart function
    var url = "https://covid19-api.org/api/timeline";
    if (searchRegionCode != 'world') {
        url += ("/" + searchRegionCode);
    }
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('date', 'Date');
    dataTable.addColumn('number', 'Cases');

    var options = {
        chartArea: {width: '80%', height: '80%'},
        colors: ['#E7EB90'],
        legend: 'none',
        backgroundColor: 'none',
        hAxis: {format: 'MMM d', textStyle: {color: '#fff'}, gridlineColor: 'none', minorGridlines: {count: 0}},
        vAxis: {format: 'short', textStyle: {color: '#fff'}, gridlineColor: '#444', minorGridlines: {color: 'none'}},
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("barChart"));
    
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        var tableArray = [];
        if (searchRegionCode != 'world') {
            for (var i = 1; i < 10; i++) {
                var nDate = new Date(data[i].last_update);
                tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), data[i-1].cases - data[i].cases]);
            }
        }

        else {
            for (var i = 1; i < 10; i++) {
                var nDate = new Date(data[i].last_update);
                tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), data[i-1].total_cases - data[i].total_cases]);
            }
        }
        dataTable.addRows(tableArray);

        chart.draw(dataTable, options);
    })
    .catch(function(error) { // error handling for non existing data
        var tableArray = [];
        for (var i = 1; i < 10; i++) {
            var nDate = new Date();
            tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), 0]);
        }
        chart.draw(dataTable, options);
    });
}

function drawPieChart() { // pie chart function
    var url = "https://covid19-api.org/api/timeline";
    if (searchRegionCode != 'world') {
        url += ("/" + searchRegionCode);
    }

    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        if (searchRegionCode != 'world') {
            var dataTable = google.visualization.arrayToDataTable([
                ['Status', 'Number of Cases'],
                ['Active', data[0].cases - (data[0].deaths + data[0].recovered)],
                ['Recovered', data[0].recovered],
                ['Death', data[0].deaths],
            ]);
        }

        else {
            var dataTable = google.visualization.arrayToDataTable([
                ['Status', 'Number of Cases'],
                ['Active', data[0].total_cases - (data[0].total_deaths + data[0].total_recovered)],
                ['Recovered', data[0].total_recovered],
                ['Death', data[0].total_deaths],
            ]);
        }

        var options = {
            chartArea: {width: '80%', height: '90%'},
            backgroundColor: 'none',
            legend: 'none',
            tooltip: {textStyle: {fontSize: 12}},
            pieSliceTextStyle: {fontSize: 16},
            slices: {
                0: {color: '#EC7505'},
                1: {color: '#5FAD41'},
                2: {color: '#FF5154'}
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
        chart.draw(dataTable, options);
    });
}

function drawLineChart() { // line chart function
    var url = "https://covid19-api.org/api/timeline";
    if (searchRegionCode != 'world') {
        url += ("/" + searchRegionCode);
    }
    
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('date', 'Date');
        dataTable.addColumn('number', 'Cases');

        var tableArray = [];
        if (searchRegionCode != 'world') {
            for (var i = 0; i < data.length; i++) {
                tableArray.push([new Date(data[i].last_update), data[i].cases]);
            }
        }

        else {
            for (var i = 0; i < data.length; i++) {
                tableArray.push([new Date(data[i].last_update), data[i].total_cases]);
            }
        }
        dataTable.addRows(tableArray);

        var options = {
            backgroundColor: 'none',
            legend: 'none',
            chartArea: {width: '70%', height: '80%'},
            colors: ['#E7EB90'],
            hAxis: {title: 'Date', format: 'MMM d', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: {color: 'none',  count: 0}},
            vAxis: {title: 'Cases', format: 'short', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: {color: '#333'}},
        };

        var chart = new google.visualization.LineChart(document.getElementById('lineChart'));
        chart.draw(dataTable, options);
    });
}
