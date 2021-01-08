$(document).ready(function() {
    
  // load google visualization API
  google.charts.load("current", {packages: ['corechart', 'geochart'] , mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'});
  
  google.charts.setOnLoadCallback(drawRegionMap); // call geo chart function
  google.charts.setOnLoadCallback(drawBarChart); // call bar chart function
  google.charts.setOnLoadCallback(drawPieChart); // call pie chart function
  google.charts.setOnLoadCallback(drawLineChart); // call line chart function
});

function drawRegionMap() { // geo chart function
  fetch("https://api.covid19api.com/world?from=2020-11-01T00:00:00Z&to=2020-12-01T00:00:00Z")
  .then(response => response.json())
  .then(function(data) {
      let regionName = 'world' // used for selecting region

      var dataTable = google.visualization.arrayToDataTable([
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
          legend: {textStyle: {color:'#888', auraColor: 'none', fontSize: 16}}
      };
  
      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(dataTable, options);
  });
}

function drawBarChart() { // bar chart function
  var yesterday = new Date;
  yesterday.setDate(new Date().getDate() - 1)
  var lastTenDays = new Date;
  lastTenDays.setDate(new Date().getDate() - 10)

  // collect only last 9 days entries excluding today as today might not be recorded.
  fetch("https://api.covid19api.com/world?from=" + lastTenDays.toISOString() + "&to=" + yesterday.toISOString())
  .then(response => response.json())
  .then(function(data) {
      var dataTable = new google.visualization.DataTable();
      dataTable.addColumn('date', 'Date');
      dataTable.addColumn('number', 'Cases');
      
      var tableArray = [];
      for (var i = 0; i < data.length; i++) {
          tableArray.push([new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() - i), data[i].NewConfirmed]);
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
  fetch("https://api.covid19api.com/world/total")
  .then(response => response.json())
  .then(function(data) {
      var dataTable = google.visualization.arrayToDataTable([
          ['Status', 'Number of Cases'],
          ['Active', data.TotalConfirmed - (data.TotalDeaths + data.TotalRecovered)],
          ['Recovered', data.TotalRecovered],
          ['Death', data.TotalDeaths],
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
  var today = new Date;

  fetch("https://api.covid19api.com/world?from=2020-01-22T00:00:00Z&to=" + today.toISOString())
  .then(response => response.json())
  .then(function(data) {
      console.log(data);
      
      var startDate = new Date;
      startDate.setDate(new Date().getDate() - data.length)

      var dataTable = new google.visualization.DataTable();
      dataTable.addColumn('date', 'Date');
      dataTable.addColumn('number', 'Cases');

      var tableArray = [];
      for (var i = 0; i < data.length; i++) {
          console.log(i, data[i].TotalConfirmed);
          tableArray.push([new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i), data[i].TotalConfirmed]);
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
