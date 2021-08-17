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
    const API_KEY = "48bca8c56bd4859a1472b7a8218c0053"
    let query = "COVID19"
    let lang = "en"
    const URL = `https://gnews.io/api/v4/search?q=${query}&lang=${lang}&token=${API_KEY}`
    
    fetch(URL)
    .then(response => response.json())
    .then(function(data) {
        if (data.articles.length > 0) {
            $("#news-warning").hide()

            var articles = data.articles;
            articles.map((a) => {
                $("#articles").append(`
                    <div class="max-w-sm rounded shadow-lg mr-4 bg-white">
                        <img class="h-48 w-full object-cover" src="${a.image}" alt="${a.title}">
                        <div class="w-64 h-52 min-w-full px-6 py-4">
                            <p class="font-bold text-lg pb-2 overflow-hidden">${a.title}</p>
                            <p class="text-gray-700 max-w-xl font-semibold text-base overflow-hidden" style="text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${a.description}</p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <a class="inline-block bg-blue-100 hover:bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 hover:text-blue-100 mr-2 mb-2" href="${a.url}">View Article</a>
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
        $(".mobile-menu").toggle("hidden");
    })
})