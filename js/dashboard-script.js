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
        
        for (const [key, value] of Object.entries(data.cases)) {
            timelineDates.push(key)
            timelineData.push(value)
        }

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
                datasets: [{
                    label: "Cases",
                    data: timelineData,
                    fill: false,
                    borderColor: 'rgb(245, 158, 11)',
                    backgroundColor: 'rgba(245, 158, 11, 0.5)',
                    tension: 0.1
                }]
            }
        })
    })
})