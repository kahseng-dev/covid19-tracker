$(document).ready(function() {
    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })

    const API = "https://disease.sh/v3/covid-19/"

    fetch(API + "countries")
    .then(response => response.json())
    .then(function(data) {
        $("#date").html(`Last Updated: <br class="inline lg:hidden" />${new Date(data[0].updated).toUTCString()}`)
        
        var mapData = []

        data.map((d) => {
            mapData.push([String(d.countryInfo.iso2).toLowerCase(), d.cases])
        })

        Highcharts.mapChart('map', {
            chart: {
                backgroundColor: null,
                map: 'custom/world'
            },

            title: { text: null },
            mapNavigation: { enabled: false },
            
            colorAxis: {
                labels: {
                    style: { color: '#BFDBFE' }
                },
                min: 0,
                stops: [
                    [0, '#EFF6FF'],
                    [0.25, '#2563EB'],
                    [0.5, '#1D4ED8'],
                    [0.75, '#1E40AF'],
                    [1, '#1E3A8A']
                ]
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },
        
            series: [{
                data: mapData,
                name: 'Number of Cases',
                states: {
                    hover: {
                        color: '#F59E0B'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }]
        })
    })

    fetch(API + "historical/all?lastdays=all")
    .then(response => response.json())
    .then(function(data) {
        var timelineDates = []
        var timelineData = []
        
        $.each(data.cases, function(date, value) {
            timelineDates.push(date)
        })

        $.each(data, function(key, value) {
            switch(key) {
                case "cases":
                    color = "#F3A712"
                    break;

                case "deaths":
                    color = "#E85F5C"
                    break;

                case "recovered":
                    color = "#9EB25D"
                    break;
            }

            timelineData.push({
                label: key,
                data: value,
                fill: false,
                backgroundColor: color,
                tension: 0.1
            })
        })

        let timelineChart = document.getElementById("timelineChart");
        new Chart(timelineChart, {
            type:'line',
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#BFDBFE'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#1F2937'
                        },
                        ticks: {
                            color: '#BFDBFE'
                        }
                    },
                    y: {
                        grid: {
                            color: '#1F2937'
                        },
                        ticks: {
                            color: '#BFDBFE',
                            beginAtZero: true
                        }
                    }
                }
            },
            data: {
                labels: timelineDates,
                datasets: timelineData
            }
        })
    })
})