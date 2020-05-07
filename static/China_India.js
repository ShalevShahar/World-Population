//////////////// MIDDLE TOTAL POP

async function currentPopCalc() {
    //fetching the file and converting it to text
    const response = await fetch('/static/ChinaIndia2019-2020.csv');
    const data = await response.text();
    //Time Gaps
    //epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
    const timeJuliFirst2019 = 15619392000
    const timeJuliFirst2020 = 15935616000
    const timeJuliFirst2026 = 1782910800
    const timeJuliFirst2027 = 1814446800
        //epoch time gap between 2020 an 2019
    const gap20192020 = (timeJuliFirst2020 - timeJuliFirst2019);
    const gap20262027 = (timeJuliFirst2027 - timeJuliFirst2026);
    const dateNow = Math.floor(new Date().getTime() * 0.01);
    const dateNow1 = Math.floor(new Date().getTime() * 0.001);

    // India will beat China 
    const popIndia2026 = 1457308849 //Data was taken from "newData.ipynb" jupyter notebook, in "Static" folder 
    const popIndia2027 = 1469338564
    const gapIndia2027Pop2026 = (parseFloat(popIndia2027) - parseFloat(popIndia2026))
    const IndiaPopRate2026 = (gapIndia2027Pop2026 / gap20262027)
    const popChina2026 = 1460092251
    const popChina2027 = 1461797638
    const gapChina2027Pop2026 = (parseFloat(popChina2027) - parseFloat(popChina2026))
    const ChinaPopRate2026 = (gapChina2027Pop2026 / gap20262027)
        //Intersection of two lines formula
    const IndiaBeatChinaEpoch = timeJuliFirst2026 + ((popChina2026 - popIndia2026) / (IndiaPopRate2026 - ChinaPopRate2026))
    let countDownSeconds = parseInt(IndiaBeatChinaEpoch - dateNow1)
        //Conversion of seconds to year, day,hour,minute,second
    let factor = 60 * 60 * 24 * 365
    countDownYear = Math.floor(countDownSeconds / factor)
    countDownSeconds = Math.floor(countDownSeconds % factor)
    factor = factor / 365
    countDownDay = Math.floor(countDownSeconds / factor)
    countDownSeconds = Math.floor(countDownSeconds % factor)
    factor = factor / 24
    countDownHour = Math.floor(countDownSeconds / factor)
    countDownSeconds = Math.floor(countDownSeconds % factor)
    factor = factor / 60
    countDownMinute = Math.floor(countDownSeconds / factor)
    countDownSeconds = Math.floor(countDownSeconds % factor)
    const indiaBeatChinaScreen = countDownYear + '\xa0\xa0\xa0' + countDownDay +
        '\xa0\xa0\xa0' + countDownHour + '\xa0\xa0\xa0' + countDownMinute + '\xa0\xa0\xa0' + countDownSeconds +
        '\xa0\xa0\xa0'
    const obj8 = document.getElementById("i");
    obj8.innerHTML = indiaBeatChinaScreen.toLocaleString();

    //India total
    const popIndia2019 = data.split('\n').slice(2)[0].split(',')[1];
    const popIndia2020 = data.split('\n').slice(2)[0].split(',')[4];
    const gapIndia2020Pop2019 = (parseFloat(popIndia2020) - parseFloat(popIndia2019))
    const IndiaPopRate = (gapIndia2020Pop2019 / gap20192020)
    const IndiaPopNow = (parseFloat(popIndia2019) + (parseFloat(IndiaPopRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
    const obj = document.getElementById("IndiaTotal");
    obj.innerHTML = parseInt(IndiaPopNow).toLocaleString();

    //India Male
    const mailIndia2019 = data.split('\n').slice(2)[0].split(',')[2];
    const mailIndia2020 = data.split('\n').slice(2)[0].split(',')[5];
    const gapIndia2020mail2019 = (parseFloat(mailIndia2020) - parseFloat(mailIndia2019))
    const IndiamailRate = (gapIndia2020mail2019 / gap20192020)
    const IndiamailNow = (parseFloat(mailIndia2019) + (parseFloat(IndiamailRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
    const obj3 = document.getElementById("IndiaMail");
    obj3.innerHTML = parseInt(IndiamailNow).toLocaleString();

    //India Female
    const femaleIndia2019 = data.split('\n').slice(2)[0].split(',')[3];
    const femaleIndia2020 = data.split('\n').slice(2)[0].split(',')[6];
    const gapIndia2020female2019 = (parseFloat(femaleIndia2020) - parseFloat(femaleIndia2019))
    const IndiafemaleRate = (gapIndia2020female2019 / gap20192020)
    const IndiafemaleNow = (parseFloat(femaleIndia2019) + (parseFloat(IndiafemaleRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
    const obj4 = document.getElementById("IndiaFemale");
    obj4.innerHTML = parseInt(IndiafemaleNow).toLocaleString();

    //China total
    const popChina2019 = data.split('\n').slice(1)[0].split(',')[1];
    const popChina2020 = data.split('\n').slice(1)[0].split(',')[4];
    const gapChina2020Pop2019 = (parseFloat(popChina2020) - parseFloat(popChina2019))
    const ChinaPopRate = (gapChina2020Pop2019 / gap20192020)
    const ChinaPopNow = (parseFloat(popChina2019) + (parseFloat(ChinaPopRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
    const obj2 = document.getElementById("ChinaTotal");
    obj2.innerHTML = parseInt(ChinaPopNow).toLocaleString();

    //China Male
    const mailchina2019 = data.split('\n').slice(1)[0].split(',')[2];
    const mailchina2020 = data.split('\n').slice(1)[0].split(',')[5];
    const gapchina2020mail2019 = (parseFloat(mailchina2020) - parseFloat(mailchina2019))
    const chinamailRate = (gapchina2020mail2019 / gap20192020)
    const chinamailNow = (parseFloat(mailchina2019) + (parseFloat(chinamailRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
    const obj5 = document.getElementById("ChinaMale");
    obj5.innerHTML = parseInt(chinamailNow).toLocaleString();

    //China Female
    const femalechina2019 = data.split('\n').slice(1)[0].split(',')[3];
    const femalechina2020 = data.split('\n').slice(1)[0].split(',')[6];
    const gapchina2020female2019 = (parseFloat(femalechina2020) - parseFloat(femalechina2019))
    const chinafemaleRate = (gapchina2020female2019 / gap20192020)
    const chinafemaleNow = (parseFloat(femalechina2019) + (parseFloat(chinafemaleRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
    const obj6 = document.getElementById("ChinaFemale");
    obj6.innerHTML = parseInt(chinafemaleNow).toLocaleString();

    //repitition time in milisecs of the function 
    setTimeout(currentPopCalc, 500);
}
currentPopCalc()


///PHOTOS CHINA 

var images = []
let num_pics_c = 40;
for (let i = 0; i < num_pics_c; i++) {
    images[i] = "/static/China_India_photos/china/China (" + i + ").jpg";
}

///PHOTOS India 

var images2 = []
let num_pics_i = 36;
for (let i = 0; i < num_pics_i; i++) {
    images2[i] = "/static/China_India_photos/india/India (" + i + ").jpg";
}

//// SHOW PHOTOS

function showImg(countryID1, countryID2, imgPath, flag) {
    let currID = flag ? countryID1 : countryID2;
    let lastID = flag ? countryID2 : countryID1;

    document.getElementById(lastID).className += "fadeOut";
    document.getElementById(currID).src = imgPath;
    document.getElementById(currID).className = "";
    setTimeout(showPhotos, 10000);
}


let flag_c = true
let flag_i = true
x_c = 0
x_i = 0

function showPhotos() {

    const show_china = Math.round(Math.random())
    if (show_china) {
        x_c = (x_c === images.length - 1) ? 0 : x_c + 1;
        showImg('china_IMG', 'china_IMG2', images[x_c], flag_c)
        flag_c = !flag_c
    } else {
        x_i = (x_i === images2.length - 1) ? 0 : x_i + 1;
        showImg('india_IMG', 'india_IMG2', images2[x_i], flag_i)
        flag_i = !flag_i
    };
}
showPhotos();




//////Graphs

var graphs = [],
    x = -1,
    titleGraph = [];

graphs[0] = "/static/China_India_graphs/chinaIndiaPop-v6-81s.gif";
graphs[1] = "/static/China_India_graphs/chinaIndia-maleVSfemale-81s.gif";

titleGraph[0] = "TOTAL POPULATION 1950 - 2020";
titleGraph[1] = "MORE MALES THAN FEMALES (IN MILLIONS)";


function displayGraphsTitles() {
    x = (x === graphs.length - 1) ? 0 : x + 1;
    document.getElementById("graph").src = graphs[x];
    document.getElementById("graphTitle").innerHTML = titleGraph[x];
}
var intervalID3 = setInterval(displayGraphsTitles, 79500)











/////FUN FACTS

let x_fc = 0,
    china_fact = 0,
    x_fi = 0

async function factsIndiaChina() {
    //fetching the file and converting it to text

    if (china_fact) {
        const facts = await fetch('/static/ChinaFacts.txt');
        const data = await facts.text();
        const separatedFactsChina = data.split('\n')
        x_fc = (x_fc == separatedFactsChina.length - 1) ? 0 : x_fc + 1;
        const obj15 = document.getElementById("news")
        obj15.innerHTML = separatedFactsChina[x_fc].toLocaleString()
    } else {
        const facts1 = await fetch('/static/IndiaFacts.txt');
        const data1 = await facts1.text();
        const separatedFactsIndia = data1.split('\n')
        x_fi = (x_fi == separatedFactsIndia.length - 1) ? 0 : x_fi + 1;
        const obj15 = document.getElementById("news")
        obj15.innerHTML = separatedFactsIndia[x_fi].toLocaleString()
    }
    china_fact = !china_fact
    setTimeout(factsIndiaChina, 10000);
}
factsIndiaChina()

////// TIME IN SELECTED CITIES

var intervalID2 = setInterval(currentTime, 1000);

function currentTime() {
    var year = new Date().toLocaleDateString("en-GB", { year: 'numeric', timeZone: "Europe/London" }) + '©'
    var Tokyo = 'BEIJING - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "Asia/Shanghai" })
    var NewDelhi = 'NEW DELHI - ' + new Date().toLocaleTimeString("en-GB", { day: '2-digit', month: '2-digit', timeZone: "Asia/Calcutta" })
    document.getElementById("year").innerHTML = year
    document.getElementById("Tokyo").innerHTML = Tokyo
    document.getElementById("NewDelhi").innerHTML = NewDelhi
}