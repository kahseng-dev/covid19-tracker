let searchRegionCode = $(".custom-select option:selected").val() // used for selecting region

$(document).ready(function() {
    // load google visualization API
    google.charts.load("current", {packages: ['corechart', 'geochart']});
    updateChart(); // inital chart draw function

    addCountriesToSelect(); // find country data from api and push it to select country option.
    $(".custom-select").on("change", function(e) {
        searchRegionCode = $(".custom-select option:selected").val();
        updateChart();
    });

    // due to google chart limitation, it is not responsive. We need to redraw each time the window changes.
    $(window).resize(function() { // create a trigger to resizeEnd event to set a timeout to reduce multiple resize updates
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = 
            setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 200); // set to 200 ms
    });
    
    $(window).on('resizeEnd', function() { // when resize is done, charts will update.
        updateChart();
    });
});

async function drawRegionMap() { // geo chart function
    var chart = new google.visualization.GeoChart(document.getElementById('regionMap'));

    var options = {
        region: searchRegionCode,
        enableRegionInteractivity: 'true',
        backgroundColor: 'none',
        datalessRegionColor: '#888',
        colorAxis: {colors: ['#FAFFD8', '#FFBF46', '#EE6055', '#DE3C4B']},
        legend: {textStyle: {color:'#888', auraColor: 'none', fontSize: 16}}
    };

    const statusRes = await fetch("https://covid19-api.org/api/status");
    const statusData = await statusRes.json();

    const countriesRes = await fetch("https://covid19-api.org/api/countries");
    const countriesData = await countriesRes.json();
    
    var tableArray = [['Country', 'Cases', 'Active']];

    statusData.map((s) => {
        countriesData.map((c) => {
            if (c.alpha2 == s.country) {
                tableArray.push([{v:s.country, f:`${c.name} (${s.country})`}, s.cases, s.cases - (s.deaths + s.recovered)])
            }
        })
    })

    chart.draw(google.visualization.arrayToDataTable(tableArray), options);

    google.visualization.events.addListener(chart, 'select', function() {
        var selection = chart.getSelection();
        searchRegionCode = tableArray[selection[0].row + 1][0].v;
        updateChart();
    })
}

async function addCountriesToSelect() {
    const response = await fetch("https://covid19-api.org/api/countries");
    const data = await response.json();
    data.map((d) => $(".custom-select").append(`<option value="${d.alpha2}">${d.name} (${d.alpha2})</option>`))
}

function initTimelineURL() {
    var url = "https://covid19-api.org/api/timeline";
    if (searchRegionCode != 'world') url += ("/" + searchRegionCode);
    return url;
}

function updateChart() {
    $(`.custom-select option[value=${searchRegionCode}]`).attr('selected', 'selected');
    google.charts.setOnLoadCallback(drawRegionMap); // call geo chart function
    google.charts.setOnLoadCallback(drawBarChart); // call bar chart function
    google.charts.setOnLoadCallback(drawPieChart); // call pie chart function
    google.charts.setOnLoadCallback(drawLineChart); // call line chart function
}

function drawBarChart() { // bar chart function
    var dataTable = new google.visualization.DataTable();
    var chart = new google.visualization.ColumnChart(document.getElementById("barChart"));
    
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

    fetch(initTimelineURL())
    .then(response => response.json())
    .then(function(data) {
        var tableArray = [];
        if (searchRegionCode != 'world') {
            for (var i = 1; i < 10; i++) {
                var nDate = new Date(data[i].last_update);
                tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), data[i-1].cases - data[i].cases]);
            }

        } else {
            for (var i = 1; i < 10; i++) {
                var nDate = new Date(data[i].last_update);
                tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), data[i-1].total_cases - data[i].total_cases]);
            }
        }

        dataTable.addRows(tableArray);
        chart.draw(dataTable, options);
    })
    .catch(function(err) { // error handling for countries with no data
        var tableArray = [];
        for (var i = 1; i < 10; i++) {
            var nDate = new Date();
            tableArray.push([new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1), null]);
        }

        dataTable.addRows(tableArray);
        chart.draw(dataTable, options);
    });
}

function drawPieChart() { // pie chart function
    var chart = new google.visualization.PieChart(document.getElementById('pieChart'));

    var options = {
        chartArea: {width: '80%', height: '90%'},
        backgroundColor: 'none',
        legend: 'none',
        tooltip: {textStyle: {fontSize: 12}},
        pieSliceTextStyle: {fontSize: 16},
        slices: {0:{color: '#EC7505'}, 1:{color: '#5FAD41'}, 2:{color: '#FF5154'}}
    };

    fetch(initTimelineURL())
    .then(response => response.json())
    .then(function(data) {
        var dataArray = [];
        if (searchRegionCode != 'world') {
            dataArray = [data[0].cases - (data[0].deaths + data[0].recovered), data[0].recovered, data[0].deaths];

        } else {
            dataArray = [data[0].total_cases - (data[0].total_deaths + data[0].total_recovered), data[0].total_recovered, data[0].total_deaths];
        }
        
        var dataTable = google.visualization.arrayToDataTable([
            ['Status', 'Number of Cases'],
            ['Active', dataArray[0]],
            ['Recovered', dataArray[1]],
            ['Death', dataArray[2]],
        ]);

        chart.draw(dataTable, options);
    });
}

function drawLineChart() { // line chart function
    var dataTable = new google.visualization.DataTable();
    var chart = new google.visualization.LineChart(document.getElementById('lineChart'));
    
    dataTable.addColumn('date', 'Date');
    dataTable.addColumn('number', 'Cases');

    var options = {
        backgroundColor: 'none',
        legend: 'none',
        chartArea: {width: '70%', height: '80%'},
        colors: ['#E7EB90'],
        hAxis: {title: 'Date', format: 'MMM d', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: {color: 'none',  count: 0}},
        vAxis: {title: 'Cases', format: 'short', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: {color: '#333'}},
    };

    fetch(initTimelineURL())
    .then(response => response.json())
    .then(function(data) {
        var tableArray = [];
        if (searchRegionCode != 'world') {
            data.map((d) => tableArray.push([new Date(d.last_update), d.cases]));
        } else { 
            data.map((d) => tableArray.push([new Date(d.last_update), d.total_cases]));
        }

        dataTable.addRows(tableArray);
        chart.draw(dataTable, options);
    });
}