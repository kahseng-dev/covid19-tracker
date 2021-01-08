const entries = document.getElementById("entries");
let countryStatus = [];

$(document).ready(function() {
    loadData();
});

const loadData = async() => {
    const statusRes = await fetch("https://covid19-api.org/api/status");
    countryStatus = await statusRes.json();

    displayCountries(countryStatus);
};

const displayCountries = (countries) => {
    var dataArray = [];
    let i = 0

    countries.map((c) => {
        var countryArray = [];
        
        fetch("https://covid19-api.org/api/country/" + c.country)
        .then(response => response.json())
        .then(function(data) {
            countryArray.push(
                `<tr>`,
                `<td scope="row">${i += 1}</td>`,
                `<td>` + data.name + `</td>`,
                `<td>${c.country}</td>`,
                `<td>${c.cases}</td>`,
                `<td>${c.deaths}</td>`,
                `<td>${c.recovered}</td>`,
                `<td>${c.cases - (c.deaths + c.recovered)}</td>`,
                `</tr>`
            )
            dataArray.push(countryArray);
            entries.innerHTML += countryArray.join('').replace(',','')
        })
    })
};