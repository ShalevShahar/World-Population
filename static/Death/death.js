//////////////// MIDDLE TOTAL POP
// var countryData = '';
// for (let i = 0; i < 30; i++) {
//     countryData += "<tr>";
//     countryData += "<td><img id='cause" + i + "' src='' height='' width=''> </td>";
//     //
//     //
//     //
// }

async function deathNowFunc() {
    //fetching the file and converting it to text
    const response = await fetch('/static/Death/death_2020-2021.csv');
    const data = await response.text();
    //epoch time of January 1th 2020. Taken from https://www.epochconverter.com/
    const time2020 = 1577840400000
    const time2021 = 1609462800000
    const secondsInYear = (time2021 - time2020);
    const dateNow = Math.floor(new Date().getTime());
    let timePassed = parseFloat(dateNow - time2020)
    const dataCut = data.split('\n').slice(2)

    let number, deathNow, deathBefore, deathAfter
    for (let i = 0; i < 29; i++) { //29 = the number of lines in dataCut
        const deathIn2020 = dataCut[i].split(',')[1];
        const Rate = parseFloat(deathIn2020 / (secondsInYear))

        deathNow = Rate * timePassed //float
        deathBefore = parseInt(deathNow - 1000 * Rate) //int
        deathAfter = parseInt(deathNow + 1000 * Rate) //int

        if (deathAfter > parseInt(deathNow)) {
            //document.getElementById("number" + i).className = "nothing";
            document.getElementById("number" + i).className = "fadeIn";
            document.getElementById("plus" + i).className = "fadeInPlus";
        } else if (parseInt(deathNow) > deathBefore) {
            document.getElementById("number" + i).className = "fadeOut";
            document.getElementById("plus" + i).className = "fadeOutPlus";
        } else {
            //if (document.getElementById("plus" + i).classList.contains('fadeInPlus')) {
            document.getElementById("plus" + i).className = "nothing";
            //}
        }

        number = document.getElementById("number" + i)
        number.innerHTML = parseInt(deathNow).toLocaleString();
    }
    setTimeout(deathNowFunc, 1000);



}
deathNowFunc()


async function deathTotal() {
    const response = await fetch('/static/Death/death_2020-2021.csv');
    const data = await response.text();
    const time2020 = 15778404000
    const time2021 = 16094628000
    const secondsInYear = (time2021 - time2020);
    const dateNow = Math.floor(new Date().getTime() * 0.01);
    let timePassed = dateNow - time2020;
    const dataCut = data.split('\n')
    let number
    let deathNow
    const totalDeathIn2020 = dataCut[1].split(',')[1];
    const Rate = (totalDeathIn2020 / (secondsInYear))
    deathNow = (parseFloat(Rate) * (parseFloat(timePassed)))
    number = document.getElementById("totalDeathNumber");
    number.innerHTML = parseInt(deathNow).toLocaleString();
    setTimeout(deathTotal, 400);
}

deathTotal()

////CORONA VIRUS API

$(document).ready(function() {
    var intervalID = setInterval(update_top_countries, 2000);

    function update_top_countries() {
        $.getJSON('https://api.covid19api.com/world/total',
            function(data) {
                var countryData = data['TotalDeaths']
                document.getElementById("corona").innerHTML = countryData.toLocaleString();
            }
        )
    }
});




////// TIME IN SELECTED CITIES

var intervalID2 = setInterval(currentTime, 1000);

function currentTime() {
    var year = new Date().toLocaleDateString("en-GB", { year: 'numeric', timeZone: "Europe/London" }) + '©'
    var Beijing = 'BEIJING - ' + new Date().toLocaleTimeString("en-US", { month: 'short', day: '2-digit', timeZone: "Asia/Shanghai" })
    var NewDelhi = 'NEW DELHI - ' + new Date().toLocaleTimeString("en-US", { day: '2-digit', month: 'short', timeZone: "Asia/Calcutta" })
    document.getElementById("year").innerHTML = year
    document.getElementById("Beijing").innerHTML = Beijing
    document.getElementById("NewDelhi").innerHTML = NewDelhi
}

// countryData += '<td>' + value.rank + '.' + '</td>';
// countryData += '<td id= "countryIncreasesFadeIn">' + key + '</td>';
// countryData += '<td id= "countryIncreasesFadeIn">' + value.toLocaleString() + '</td>';
// countryData += '<td id= "countryIncreasesFadeIn">' + '+1' + '</td>';
















// ///PHOTOS CHINA 

// var images = []
// let num_pics_c = 40;
// for (let i = 0; i < num_pics_c; i++) {
//     images[i] = "/static/China_India/China_India_photos/china/China (" + i + ").jpg";
// }

// ///PHOTOS India 

// var images2 = []
// let num_pics_i = 36;
// for (let i = 0; i < num_pics_i; i++) {
//     images2[i] = "/static/China_India/China_India_photos/india/India (" + i + ").jpg";
// }

// //// SHOW PHOTOS

// function showImg(countryID1, countryID2, imgPath, flag) {
//     let currID = flag ? countryID1 : countryID2;
//     let lastID = flag ? countryID2 : countryID1;

//     document.getElementById(lastID).className += "fadeOut";
//     document.getElementById(currID).src = imgPath;
//     document.getElementById(currID).className = "";
//     setTimeout(showPhotos, 10000);
// }


// let flag_c = true
// let flag_i = true
// x_c = 0
// x_i = 0

// function showPhotos() {

//     const show_china = Math.round(Math.random())
//     if (show_china) {
//         x_c = (x_c === images.length - 1) ? 0 : x_c + 1;
//         showImg('china_IMG', 'china_IMG2', images[x_c], flag_c)
//         flag_c = !flag_c
//     } else {
//         x_i = (x_i === images2.length - 1) ? 0 : x_i + 1;
//         showImg('india_IMG', 'india_IMG2', images2[x_i], flag_i)
//         flag_i = !flag_i
//     };
// }
// showPhotos();




// //////Graphs

// var graphs = [],
//     x = -1,
//     titleGraph = [];

// graphs[0] = "/static/China_India/China_India_graphs/chinaIndiaPop-v6-81s.gif";
// graphs[1] = "/static/China_India/China_India_graphs/chinaIndia-maleVSfemale-81s.gif";

// titleGraph[0] = "TOTAL POPULATION 1950 - 2020";
// titleGraph[1] = "MORE MALES THAN FEMALES (IN MILLIONS)";


// function displayGraphsTitles() {
//     x = (x === graphs.length - 1) ? 0 : x + 1;
//     document.getElementById("graph").src = graphs[x];
//     document.getElementById("graphTitle").innerHTML = titleGraph[x];
// }
// var intervalID3 = setInterval(displayGraphsTitles, 79500)






// /////FUN FACTS

// let x_fc = 0,
//     china_fact = 0,
//     x_fi = 0

// async function factsIndiaChina() {
//     //fetching the file and converting it to text

//     if (china_fact) {
//         const facts = await fetch('/static/China_India/ChinaFacts.txt');
//         const data = await facts.text();
//         const separatedFactsChina = data.split('\n')
//         x_fc = (x_fc == separatedFactsChina.length - 1) ? 0 : x_fc + 1;
//         const obj15 = document.getElementById("news")
//         obj15.innerHTML = separatedFactsChina[x_fc].toLocaleString()
//     } else {
//         const facts1 = await fetch('/static/China_India/IndiaFacts.txt');
//         const data1 = await facts1.text();
//         const separatedFactsIndia = data1.split('\n')
//         x_fi = (x_fi == separatedFactsIndia.length - 1) ? 0 : x_fi + 1;
//         const obj15 = document.getElementById("news")
//         obj15.innerHTML = separatedFactsIndia[x_fi].toLocaleString()
//     }
//     china_fact = !china_fact
//     setTimeout(factsIndiaChina, 10000);
// }
// factsIndiaChina()
///