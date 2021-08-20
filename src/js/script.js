function loadData() {
    const API = "https://disease.sh/v3/covid-19/"

    fetch(API + "all")
    .then(response => response.json())
    .then(function(data) {
        $("#date").html(`Last Updated: <br class="inline lg:hidden" />${new Date(data.updated).toUTCString()}`)
        $("#sum-confirmed").html(data.cases.toLocaleString("en-US"))
        $("#today-confirmed").html(`+${data.todayCases.toLocaleString("en-US")}`)
        $("#sum-deaths").html(data.deaths.toLocaleString("en-US"))
        $("#today-deaths").html(`+${data.todayDeaths.toLocaleString("en-US")}`)
        $("#sum-recovered").html(data.recovered.toLocaleString("en-US"))
        $("#today-recovered").html(`+${data.todayRecovered.toLocaleString("en-US")}`)
        $("#active-cases").html(data.active.toLocaleString("en-US"))
        $("#affected-countries").html(data.affectedCountries)
    })
}

function loadNews() {
    let query = "COVID19"
    const URL = `https://bing-news-search1.p.rapidapi.com/news/search?q=${query}&originalImg=true&safeSearch=Off&textFormat=Raw&freshness=Day`
    
    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-bingapis-sdk": "true",
            "x-rapidapi-key": "76c0dcf4a5msh8088c99bb5d3244p12a80ajsn5a6d240e96ea",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(function(data) {
        if (data.value.length > 0) {
            $("#news-warning").hide()
            var articles = data.value;
            articles.map((a) => {
                $("#articles").append(`
                    <div class="max-w-sm rounded-lg shadow-lg mr-4 bg-white">
                        <img class="h-48 rounded-t-lg w-full object-cover" src="${a.image.contentUrl}" alt="${a.name}">
                        <div class="w-64 h-52 min-w-full px-6 py-4">
                            <p class="font-bold text-lg pb-2 max-h-14 overflow-ellipsis overflow-hidden">${a.name}</p>
                            <p class="text-gray-700 max-h-24 font-semibold text-base overflow-ellipsis overflow-hidden">${a.description}</p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <a class="inline-block bg-blue-100 hover:bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 hover:text-blue-100 mr-2 mb-2" href="${a.url}" target="blank">View Article</a>
                        </div>
                    </div>
                `)
            })
        }

        else $("#news-warning").show()
    })
}

$(document).ready(function() {
    loadData()
    loadNews()

    $("#update-data").on("click", function() {
        loadData()
        loadNews()
    })
    
    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })
})