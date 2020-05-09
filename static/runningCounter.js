////////////////// MIDDLE TOTAL POP

async function currentPopCalc() {
    //fetching the file and converting it to text
    const response = await fetch('/static/countries2019-2020.csv');
    const data = await response.text();
    //splitting and slicing the data so it will include only the total world population.
    const pop2019 = data.split('\n').slice(235)[0].split(',')[1];
    const pop2020 = data.split('\n').slice(235)[0].split(',')[2];
    //gap of the population between 2020 and 2019
    const gapPop2020Pop2019 = (parseFloat(pop2020) - parseFloat(pop2019))
        //epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
    const timeJuliFirst2019 = 15619392000
    const timeJuliFirst2020 = 15935616000
        //epoch time gap between 2020 an 2019
    const gap20192020 = (timeJuliFirst2020 - timeJuliFirst2019);
    //growth total world population persons per second 
    const popRate = (gapPop2020Pop2019 / gap20192020)
        // current Unix timestamp in seconds
    const dateNow = Math.floor(new Date().getTime() * 0.01);
    //calculation of the world population at the moment
    const popNow = (parseFloat(pop2019) + (parseFloat(popRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
        //connection the HTML doc
    const obj = document.getElementById("c");
    obj.innerHTML = parseInt(popNow).toLocaleString();
    //repitition time in milisecs of the function 
    setTimeout(currentPopCalc, 200);
}
currentPopCalc()



//////////////// RIGHT TOP COUNTRIES

$(document).ready(function() {
    var intervalID = setInterval(update_top_countries, 2000);

    function update_top_countries() {
        $.getJSON('http://127.0.0.1:5000' + '/_topCountries',
            function(data) {
                var countryData = '';
                $.each(data, function(key, value) {
                    countryData += '<tr>';
                    if (value.popNow < value.popNowPlus2) { // all fade in
                        countryData += '<td>' + value.rank + '.' + '</td>';
                        countryData += '<td id= "countryIncreasesFadeIn">' + key + '</td>';
                        countryData += '<td id= "countryIncreasesFadeIn">' + value.popNow.toLocaleString() + '</td>';
                        countryData += '<td id= "countryIncreasesFadeIn">' + '+1' + '</td>';
                    } else if (value.popNow > value.popNowMinus2) { // all fade out
                        countryData += '<td>' + value.rank + '.' + '</td>';
                        countryData += '<td id= "countryIncreasesFadeOut">' + key + '</td>';
                        countryData += '<td id= "countryIncreasesFadeOut">' + value.popNow.toLocaleString() + '</td>';
                        countryData += '<td id= "countryIncreasesFadeOut">' + '' + '</td>';
                    } else if (value.popNow > value.popNowPlus2) { // japan fade in
                        countryData += '<td>' + value.rank + '.' + '</td>';
                        countryData += '<td id= "japanIncreasesFadeIn">' + key + '</td>';
                        countryData += '<td id= "japanIncreasesFadeIn">' + value.popNow.toLocaleString() + '</td>';
                        countryData += '<td id= "japanIncreasesFadeIn">' + '-1' + '</td>';
                    } else if (value.popNow < value.popNowMinus2) { // japan fade out
                        countryData += '<td>' + value.rank + '.' + '</td>';
                        countryData += '<td id= "japanIncreasesFadeOut">' + key + '</td>';
                        countryData += '<td id= "japanIncreasesFadeOut">' + value.popNow.toLocaleString() + '</td>';
                        countryData += '<td id= "japanIncreasesFadeOut">' + '' + '</td>';
                    } else {
                        countryData += '<td>' + value.rank + '.' + '</td>';
                        countryData += '<td>' + key + '</td>';
                        countryData += '<td>' + value.popNow.toLocaleString() + '</td>';
                        countryData += '<td>' + '' + '</td>';
                    }
                    countryData += '</tr>';
                })

                document.getElementById("topCountries").innerHTML = countryData;
            });

    };
});

//////////////// LEFT ALL COUNTRIES

var intervalID = setInterval(update_country_pop, 2000);

function update_country_pop() {
    $.getJSON('http://127.0.0.1:5000' + '/_allCountries',
        function(data) {
            var countryData = '';
            $.each(data, function(key, value) {
                countryData += '<tr>';
                if (value.popNow < value.popNowPlus2) { // all fade in
                    countryData += '<td>' + value.rank + '.' + '</td>';
                    countryData += '<td id= "countryIncreasesFadeIn">' + key + '</td>';
                    countryData += '<td id= "countryIncreasesFadeIn">' + value.popNow.toLocaleString() + '</td>';
                    countryData += '<td id= "countryIncreasesFadeIn">' + '+1' + '</td>';
                } else if (value.popNow > value.popNowMinus2) { // all fade out
                    countryData += '<td>' + value.rank + '.' + '</td>';
                    countryData += '<td id= "countryIncreasesFadeOut">' + key + '</td>';
                    countryData += '<td id= "countryIncreasesFadeOut">' + value.popNow.toLocaleString() + '</td>';
                    countryData += '<td id= "countryIncreasesFadeIn">' + '' + '</td>';
                } else if (value.popNow > value.popNowPlus2) { // japan fade in
                    countryData += '<td>' + value.rank + '.' + '</td>';
                    countryData += '<td id= "japanIncreasesFadeIn">' + key + '</td>';
                    countryData += '<td id= "japanIncreasesFadeIn">' + value.popNow.toLocaleString() + '</td>';
                    countryData += '<td id= "japanIncreasesFadeIn">' + '-1' + '</td>';
                } else if (value.popNow < value.popNowMinus2) { // japan fade out
                    countryData += '<td>' + value.rank + '.' + '</td>';
                    countryData += '<td id= "japanIncreasesFadeOut">' + key + '</td>';
                    countryData += '<td id= "japanIncreasesFadeOut">' + value.popNow.toLocaleString() + '</td>';
                    countryData += '<td id= "japanIncreasesFadeOut">' + '' + '</td>';
                } else {
                    countryData += '<td>' + value.rank + '.' + '</td>';
                    countryData += '<td>' + key + '</td>';
                    countryData += '<td>' + value.popNow.toLocaleString() + '</td>';
                    countryData += '<td id= "countryIncreasesFadeIn">' + '' + '</td>';
                }
                countryData += '</tr>';
            })
            document.getElementById("tableCountries").innerHTML = countryData;
        });
};


//////////////// MIDDLE GRAPHS + MIDDLE TITLE

var images = [],
    x = -1,
    title = [];

images[0] = "/static/last70_all_v8_45s.gif";
images[1] = "/static/next_all_45s_fixed.gif";
// images[1] = "/static/b_next_world.png";
// images[2] = "/static/aa.png";
// images[3] = "/static/b_nex_all.png";
title[0] = "PAST 70 YEARS";
title[1] = "ESTIMATION";
// title[2] = "kkuuu";
// title[3] = "asldkaskjdh";


function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("img").src = images[x];
    document.getElementById("imgTitle").innerHTML = title[x];
}
var intervalID3 = setInterval(displayNextImage, 42500)

////// Trails to fade in new picture. Did not work out. 

//  $("#img").fadeOut(3000)
//  $("#img").fadeIn(3000)
// var intervalID4 = setInterval(function() {
//     $("#img").fadeToggle("fast", "linear");
// }, 5000);
// function startTimer() {
//     // $("#img").fadeIn(3000);
//     setInterval(displayNextImage, 5000);
//     setInterval(function() {
//         $("#img").fadeToggle('fast');
//     }, 1500);
// }

//////////////   BOTTON TIMES IN CITIES

var intervalID2 = setInterval(currentTime, 1000);

function currentTime() {
    var London = 'London - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "Europe/London" })
    var year = new Date().toLocaleDateString("en-GB", { year: 'numeric', timeZone: "Europe/London" }) + '©'
    var NewYork = 'New York - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "America/New_York" })
    var Tokyo = 'Tokyo - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "Asia/Tokyo" })
    var NewDelhi = 'New Delhi - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "Asia/Calcutta" })
    var Moscow = 'Moscow - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "Europe/Moscow" })
    document.getElementById("London").innerHTML = London
    document.getElementById("year").innerHTML = year
    document.getElementById("NewYork").innerHTML = NewYork
    document.getElementById("Tokyo").innerHTML = Tokyo
    document.getElementById("NewDelhi").innerHTML = NewDelhi
    document.getElementById("Moscow").innerHTML = Moscow
}



// OLD Scripts


/////attampts to present the left graph of all countries from this JS file. It did not work out because the loading of the 
//CSV file were too slow. The solution was to send the data as JSON file from the Python Flask.

//html += "</tr></table>";

// ATTACH HTML TO CONTAINER
//document.getElementById("tableCountries").innerHTML = html;

// //function - per country world population
// async function currentPopByCountry() {
//     //fetching the file and converting it to text

//     const response = await fetch('/static/countries2019-2020.csv');
//     let data1 = await response.text();
//     data1Splitted = data1.split('\n')


//     const timeJuliFirst2019 = 1561939200
//     const dateNow = Math.floor(new Date().getTime() * 0.001);

//     const allCountriesNames = []
//     const allCountriesPopNow = []
//     const gap20192020 = (1593561600 - 1561939200)
//     for (i = 1; i < 236; i++) {
//         countryData = data1Splitted[i].split(',')
//         allCountriesNames.push(countryData[0])
//         CountryPop2019 = countryData[1];
//         CountryPop2020 = countryData[2];
//         CountryPopDiff = CountryPop2020 - CountryPop2019
//         CountryPopRate = parseFloat(CountryPopDiff / gap20192020)
//         CountyPopNow = parseFloat(CountryPop2019) + (parseFloat(CountryPopRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019)))
//         allCountriesPopNow.push(parseInt(CountyPopNow).toLocaleString())
//     }



//     // const obj = document.getElementById("countriesId");
//     // obj.innerHTML = parseInt(filteredCountries).toLocaleString();

//     window.addEventListener("load", function() {
//         // LET'S SAY THAT WE HAVE A SIMPLE FLAT ARRAY
//         // DRAW THE HTML TABLE
//         var perrow = 1, // 3 items per row
//             html = "<table><tr>";

//         // Loop through array and add table cells
//         for (var i = 0; i < allCountriesNames.length; i++) {
//             html += "<td>" + allCountriesNames[i] + "</td>";
//             // Break into next row
//             var next = i + 1;
//             if (next % perrow == 0 && next != allCountriesNames.length) {
//                 html += "</tr><tr>";
//             }
//         }
//         html += "</tr></table>";

//         // ATTACH HTML TO CONTAINER
//         document.getElementById("container").innerHTML = html;

//     });


//     window.addEventListener("load", function() {
//         // LET'S SAY THAT WE HAVE A SIMPLE FLAT ARRAY
//         // DRAW THE HTML TABLE
//         var perrow = 1, // 3 items per row
//             html = "<table><tr>";

//         // Loop through array and add table cells
//         for (var i = 0; i < allCountriesPopNow.length; i++) {
//             html += "<td>" + allCountriesPopNow[i] + "</td>";
//             // Break into next row
//             var next = i + 1;
//             if (next % perrow == 0 && next != allCountriesPopNow.length) {

//                 html += "</tr><tr>";
//             }
//         }
//         html += "</tr></table>";

//         // ATTACH HTML TO CONTAINER
//         document.getElementById("container2").innerHTML = html;
//     });
// }
// currentPopByCountry()