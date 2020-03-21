//function the calculates the current world population

async function currentPopCalc() {
    //fetching the file and converting it to text
    const response = await fetch('/static/countries2019-2020.csv');
    const data = await response.text();
    //splitting and slicing the data so it will include only the total world population.
    const pop2019 = data.split('\n').slice(236)[0].split(',')[1];
    const pop2020 = data.split('\n').slice(236)[0].split(',')[2];
    //gap of the population between 2020 and 2019
    const gapPop2020Pop2019 = (parseFloat(pop2020) - parseFloat(pop2019))
        //epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
    const timeJuliFirst2019 = 1561939200
    const timeJuliFirst2020 = 1593561600
        //epoch time gap between 2020 an 2019
    const gap20192020 = (timeJuliFirst2020 - timeJuliFirst2019);
    //growth total world population persons per second 
    const popRate = (gapPop2020Pop2019 / gap20192020)
        // current Unix timestamp in seconds
    const dateNow = Math.floor(new Date().getTime() * 0.001);
    //calculation of the world population at the moment
    const popNow = (parseFloat(pop2019) + (parseFloat(popRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
        //connection the HTML doc
    const obj = document.getElementById("c");
    obj.innerHTML = parseInt(popNow).toLocaleString();
    //repitition time in milisecs of the function 
    setTimeout(currentPopCalc, 100);
}
currentPopCalc()




// var intervalID = setInterval(update_values, 10000);

// function update_values() {
//     $.getJSON('/_hi',
//         function(data) {
//             $('#ela').text(data.ela);
//         })
//     document.getElementById('ela').innerHTML
// }
// update_values()








//function - per country world population
async function currentPopByCountry() {
    //fetching the file and converting it to text

    const response = await fetch('/static/countries2019-2020.csv');
    let data1 = await response.text();
    data1Splitted = data1.split('\n')


    const timeJuliFirst2019 = 1561939200
    const dateNow = Math.floor(new Date().getTime() * 0.001);

    const allCountriesNames = []
    const allCountriesPopNow = []
    const gap20192020 = (1593561600 - 1561939200)
    for (i = 1; i < 236; i++) {
        countryData = data1Splitted[i].split(',')
        allCountriesNames.push(countryData[0])
        CountryPop2019 = countryData[1];
        CountryPop2020 = countryData[2];
        CountryPopDiff = CountryPop2020 - CountryPop2019
        CountryPopRate = parseFloat(CountryPopDiff / gap20192020)
        CountyPopNow = parseFloat(CountryPop2019) + (parseFloat(CountryPopRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019)))
        allCountriesPopNow.push(parseInt(CountyPopNow).toLocaleString())
    }



    // const obj = document.getElementById("countriesId");
    // obj.innerHTML = parseInt(filteredCountries).toLocaleString();

    window.addEventListener("load", function() {
        // LET'S SAY THAT WE HAVE A SIMPLE FLAT ARRAY
        // DRAW THE HTML TABLE
        var perrow = 1, // 3 items per row
            html = "<table><tr>";

        // Loop through array and add table cells
        for (var i = 0; i < allCountriesNames.length; i++) {
            html += "<td>" + allCountriesNames[i] + "</td>";
            // Break into next row
            var next = i + 1;
            if (next % perrow == 0 && next != allCountriesNames.length) {
                html += "</tr><tr>";
            }
        }
        html += "</tr></table>";

        // ATTACH HTML TO CONTAINER
        document.getElementById("container").innerHTML = html;

    });


    window.addEventListener("load", function() {
        // LET'S SAY THAT WE HAVE A SIMPLE FLAT ARRAY
        // DRAW THE HTML TABLE
        var perrow = 1, // 3 items per row
            html = "<table><tr>";

        // Loop through array and add table cells
        for (var i = 0; i < allCountriesPopNow.length; i++) {
            html += "<td>" + allCountriesPopNow[i] + "</td>";
            // Break into next row
            var next = i + 1;
            if (next % perrow == 0 && next != allCountriesPopNow.length) {

                html += "</tr><tr>";
            }
        }
        html += "</tr></table>";

        // ATTACH HTML TO CONTAINER
        document.getElementById("container2").innerHTML = html;
    });
    setTimeout(currentPopByCountry, 10000);
}
currentPopByCountry()