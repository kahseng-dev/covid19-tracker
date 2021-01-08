$(document).ready(function() {
    $(".entries").html(``);
    createWorldRow();
    createCountryRow();
});

async function createWorldRow() {
    var url = "https://covid19-api.org/api/timeline";
    const response = await fetch(url);
    var data = await response.json();
    $(".entries").append(
        `<tr style="background-color: rgba(0,0,0,.075);" >
            <td scope="row"></td>
            <td>World</td>
            <td>${data[0].total_cases}</td>
            <td>${data[0].total_deaths}</td>
            <td>${data[0].total_recovered}</td>
            <td>${data[0].total_cases - (data[0].total_deaths + data[0].total_recovered)}</td>
        </tr>`
    );
}

async function createCountryRow() {
    var countryURL = "https://covid19-api.org/api/countries";
    const countryResponse = await fetch(countryURL);
    var countryData = await countryResponse.json();

    for (i = 0; i < countryData.length; i++) {
        var statusURL = "https://covid19-api.org/api/status/" + countryData[i].alpha2;
        const statusResponse = await fetch(statusURL);
        var statusData = await statusResponse.json();
                
        $(".entries").append(
            `<tr>
                <td scope="row">${i+1}</td>
                <td>${countryData[i].name}</td>
                <td>${statusData.cases}</td>
                <td>${statusData.deaths}</td>
                <td>${statusData.recovered}</td>
                <td>${statusData.cases - (statusData.deaths + statusData.recovered)}</td>
            </tr>`
        );
    }
}