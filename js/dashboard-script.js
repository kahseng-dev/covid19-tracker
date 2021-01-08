$(document).ready(function() {
    // load google visualization API
    google.charts.load("current", {packages: ['corechart', 'geochart'] , mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'});
    
    google.charts.setOnLoadCallback(drawRegionMap); // call geo chart function
    google.charts.setOnLoadCallback(drawBarChart); // call bar chart function
    google.charts.setOnLoadCallback(drawPieChart); // call pie chart function
    google.charts.setOnLoadCallback(drawLineChart); // call line chart function
});

function drawRegionMap() { // geo chart function
    let searchRegionName = 'world' // used for selecting region
    
    fetch("https://covid19-api.org/api/status")
    .then(response => response.json())
    .then(function(data) {
        var tableArray = [['Country', 'Total Cases']];
        for (var i = 0; i < data.length; i++) {
            tableArray.push([data[i].country, data[i].cases]);
        }
        var dataTable = google.visualization.arrayToDataTable(tableArray);

        var options = {
            region: searchRegionName,
            backgroundColor: 'none',
            datalessRegionColor: '#888',
            colorAxis: {colors: ['#FAFFD8', '#FFD97D', '#FFBF46', '#EE6055', '#DE3C4B']},
            legend: {textStyle: {color:'#888', auraColor: 'none', fontSize: 16}}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(dataTable, options);
    });
}

function drawBarChart() { // bar chart function
    fetch("https://covid19-api.org/api/timeline")
    .then(response => response.json())
    .then(function(data) {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('date', 'Date');
        dataTable.addColumn('number', 'Cases');
        
        var tableArray = [];
        for (var i = 1; i < 10; i++) {
            var nDate = new Date(data[i].last_update);
            tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), data[i-1].total_cases - data[i].total_cases]);
        }
        dataTable.addRows(tableArray);

        var options = {
            chartArea: {width: '80%', height: '80%'},
            colors: ['#E7EB90'],
            legend: 'none',
            backgroundColor: 'none',
            hAxis: {format: 'MMM d yyyy', textStyle: {color: '#fff'}, gridlineColor: 'none', minorGridlines: {count: 0}},
            vAxis: {format: 'short', textStyle: {color: '#fff'}, gridlineColor: '#444', minorGridlines: {color: 'none'}},
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(dataTable, options);
    });
}

function drawPieChart() { // pie chart function
    fetch("https://covid19-api.org/api/timeline")
    .then(response => response.json())
    .then(function(data) {
        var dataTable = google.visualization.arrayToDataTable([
            ['Status', 'Number of Cases'],
            ['Active', data[0].total_cases - (data[0].total_deaths + data[0].total_recovered)],
            ['Recovered', data[0].total_recovered],
            ['Death', data[0].total_deaths],
        ]);

        var options = {
            chartArea: {width: '90%', height: '90%'},
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

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(dataTable, options);
    });
}

function drawLineChart() { // line chart function
    fetch("https://covid19-api.org/api/timeline")
    .then(response => response.json())
    .then(function(data) {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('date', 'Date');
        dataTable.addColumn('number', 'Cases');

        var tableArray = [];
        for (var i = 0; i < data.length; i++) {
            tableArray.push([new Date(data[i].last_update), data[i].total_cases]);
        }
        dataTable.addRows(tableArray);

        var options = {
            backgroundColor: 'none',
            legend: 'none',
            chartArea: {width: '75%', height: '80%'},
            colors: ['#E7EB90'],
            hAxis: {title: 'Date', format: 'MMM d', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: {color: 'none',  count: 0}},
            vAxis: {title: 'Cases', format: 'short', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: {color: '#333'}},
        };

        var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
        chart.draw(dataTable, options);
    });
}
