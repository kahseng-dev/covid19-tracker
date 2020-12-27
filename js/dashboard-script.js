function drawRegionsMap() { // geo chart function
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Total Cases'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700]
  ]);

  var options = {
    region: regionName,
    backgroundColor: 'none',
    datalessRegionColor: '#888',
    colorAxis: {colors: ['#FBD87F', '#E28413', '#DE3C4B']},
    legend: { textStyle: { color:'#888', auraColor: 'none', fontSize: 16 }}
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}

function drawBarChart() { // bar chart function
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Cases');
  data.addRows([
    [new Date (2020, 4, 1), 1162857],
    [new Date (2020, 4, 2), 1202857],
    [new Date (2020, 4, 3), 1002857],
    [new Date (2020, 4, 4), 90857],
    [new Date (2020, 4, 5), 90857],
    [new Date (2020, 4, 6), 90857],
    [new Date (2020, 4, 7), 90857],
    [new Date (2020, 4, 8), 90857],
    [new Date (2020, 4, 9), 90857],
    [new Date (2020, 4, 10), 90857],
  ]);

  var options = {
    chartArea: {'width': '80%', 'height': '80%'},
    colors: ['#E7EB90'],
    legend: 'none',
    backgroundColor: 'none',
    hAxis: { format: 'MMM d', textStyle: {color: '#fff'}, gridlineColor: 'none', minorGridlines: { count: 0 }},
    vAxis: { format: 'short', textStyle: {color: '#fff'}, gridlineColor: '#444', minorGridlines: { color: 'none' }},
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
  chart.draw(data, options);
}

function drawPieChart() { // pie chart function
  var data = google.visualization.arrayToDataTable([
    ['Status', 'Number of Cases'],
    ['Active', 11],
    ['Recovered', 2],
    ['Death', 2],
  ]);

  var options = {
    chartArea: {'width': '90%', 'height': '90%'},
    backgroundColor: 'none',
    legend: 'none',
    pieSliceTextStyle: {fontSize: 16},
    slices: {
      0: { color: '#EC7505' },
      1: { color: '#5FAD41' },
      2: { color: '#FF5154' }
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

function drawLineChart() { // line chart function
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Cases');
  data.addRows([
    [new Date (2020, 4, 1), 1162857],
    [new Date (2020, 4, 2), 1202857],
    [new Date (2020, 4, 3), 1002857],
    [new Date (2020, 4, 4), 90857],
    [new Date (2020, 4, 5), 90857],
    [new Date (2020, 4, 6), 90857],
    [new Date (2020, 4, 7), 90857],
    [new Date (2020, 4, 8), 90857],
    [new Date (2020, 4, 9), 90857],
    [new Date (2020, 4, 10), 90857],
  ]);

  var options = {
    backgroundColor: 'none',
    legend: 'none',
    chartArea: {'width': '75%', 'height': '80%'},
    colors: ['#E7EB90'],
    hAxis: { title: 'Date', format: 'MMM d', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: { color: 'none',  count: 0 }},
    vAxis: { title: 'Cases', format: 'short', titleTextStyle: {color: '#fff'}, textStyle: {color: '#fff'}, gridlineColor: '#333', minorGridlines: { color: '#333'}},
  };

  var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
  chart.draw(data, options);
}

let regionName = 'world' // used for selecting region
google.charts.load("current", {packages:['corechart', 'geochart'] , // loading Google visualization API
  mapsApiKey : 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

google.charts.setOnLoadCallback(drawRegionsMap); // call geo chart function
google.charts.setOnLoadCallback(drawBarChart); // call bar chart function
google.charts.setOnLoadCallback(drawPieChart); // call pie chart function
google.charts.setOnLoadCallback(drawLineChart); // call line chart function