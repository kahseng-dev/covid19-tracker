function loadData() {
    const API = "https://disease.sh/v3/covid-19/"

    fetch(API + "countries")
    .then(response => response.json())
    .then(function(data) {
        $("#date").html(`Last Updated: <br class="inline lg:hidden" />${new Date(data[0].updated).toUTCString()}`)

        console.log(data[0])
        data.map((d) => {
            $("#data-list").append(`
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.country}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.cases}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.deaths}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.recovered}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.active}</td>
                </tr>
            `);
        });
    })
}

$(document).ready(function() {
    loadData()

    $("#update-data").on("click", function() {
        loadData()
    })

    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden");
    })
})