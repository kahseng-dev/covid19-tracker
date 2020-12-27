let url = 'https://api.covid19api.com/summary';

function displayTable(dataList) {
    $(".entries").html(``);
    $(".entries").append(
        `<tr style="background-color: rgba(0,0,0,.075);" >
            <th scope="row"></th>
            <td>Global</td>
            <td>${dataList[0].TotalConfirmed}</td>
            <td>${dataList[0].NewConfirmed}</td>
            <td>${dataList[0].TotalDeaths}</td>
            <td>${dataList[0].NewDeaths}</td>
            <td>${dataList[0].TotalRecovered}</td>
            <td>${dataList[0].NewRecovered}</td>
            <td>${dataList[0].TotalConfirmed - (dataList[0].TotalDeaths + dataList[0].TotalRecovered)}</td>
        </tr>`
    );
    for (i = 1; i < dataList.length; i++) {
        $(".entries").append(
            `<tr>
                <th scope="row">${i}</th>
                <td>${dataList[i].Country}</td>
                <td>${dataList[i].TotalConfirmed}</td>
                <td>${dataList[i].NewConfirmed}</td>
                <td>${dataList[i].TotalDeaths}</td>
                <td>${dataList[i].NewDeaths}</td>
                <td>${dataList[i].TotalRecovered}</td>
                <td>${dataList[i].NewRecovered}</td>
                <td>${dataList[i].TotalConfirmed - (dataList[i].TotalDeaths + dataList[i].TotalRecovered)}</td>
            </tr>`
        );
    }
}

$(document).ready(function() {
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        var global = data.Global;
        var dataList = [global];
        for (i = 0; i < data.Countries.length; i++) {
            dataList.push(data.Countries[i]);
        }
        displayTable(dataList);
        $("#countryButton").on("click", function() {
            dataList.sort(function(a,b) {
                if (a.Country < b.Country) { return -1; }
                if (a.Country > b.Country) { return 1; }
                return 0;
            });
            displayTable(dataList);
        });
        $("#totalCaseButton").on("click", function() {
            dataList.sort((a,b) => { return b.TotalConfirmed - a.TotalConfirmed; });
            displayTable(dataList);
        });
        $("#newCaseButton").on("click", function() {
            dataList.sort((a,b) => { return b.NewConfirmed - a.NewConfirmed; });
            displayTable(dataList);
        });
        $("#totalDeathsButton").on("click", function() {
            dataList.sort((a,b) => { return b.TotalDeaths - a.TotalDeaths; });
            displayTable(dataList);
        });
        $("#newDeathsButton").on("click", function() {
            dataList.sort((a,b) => { return b.NewDeaths - a.NewDeaths; });
            displayTable(dataList);
        });
        $("#totalRecoveredButton").on("click", function() {
            dataList.sort((a,b) => { return b.TotalRecovered - a.TotalRecovered; });
            displayTable(dataList);
        });
        $("#newRecoveredButton").on("click", function() {
            dataList.sort((a,b) => { return b.NewRecovered - a.NewRecovered; });
            displayTable(dataList);
        });
        $("#activeCasesButton").on("click", function() {
            dataList.sort((a,b) => { return (b.TotalConfirmed - (b.TotalDeaths + b.TotalRecovered)) - (a.TotalConfirmed - (a.TotalDeaths + a.TotalRecovered)); });
            displayTable(dataList);
        });
    });
});