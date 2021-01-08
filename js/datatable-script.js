const entries = document.getElementById("entries");

const loadData = async() => {
    const statusRes = await fetch("https://covid19-api.org/api/status");
    const countryStatus = await statusRes.json();

    const dataArray = countryStatus.map(async (c) => {
        const countryRes = await fetch("https://covid19-api.org/api/country/" + c.country);
        const countryInfo = await countryRes.json();

        return Promise.all([countryInfo.name, c])
    })
    displayData(dataArray)
}

const displayData = (dataArray) => {
    var i = 0;
    
    dataArray.forEach(data => {
        data.then(result => {
            console.log(result)
            var htmlString = [
                `<tr>`,
                `<td scope="row">${i += 1}</td>`,
                `<td>${result[0]}</td>`,
                `<td>${result[1].country}</td>`,
                `<td>${result[1].cases}</td>`,
                `<td>${result[1].deaths}</td>`,
                `<td>${result[1].recovered}</td>`,
                `<td>${result[1].cases - (result[1].deaths + result[1].recovered)}</td>`,
                `</tr>`
            ]
            entries.innerHTML += htmlString.join('').replace(',','')
        })
    })
}

loadData()
