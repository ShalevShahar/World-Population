//////////////// MIDDLE TOTAL POP

async function currentPopCalc() {
    //fetching the file and converting it to text
    const response = await fetch('/static/countries2019-2020.csv');
    const data = await response.text();
    //splitting and slicing the data so it will include only the total world population.
    const popIndia2019 = data.split('\n').slice(94)[0].split(',')[1];
    const popIndia2020 = data.split('\n').slice(94)[0].split(',')[2];

    const popChina2019 = data.split('\n').slice(41)[0].split(',')[1];
    const popChina2020 = data.split('\n').slice(41)[0].split(',')[2];
    //gap of the population between 2020 and 2019
    const gapIndia2020Pop2019 = (parseFloat(popIndia2020) - parseFloat(popIndia2019))

    const gapChina2020Pop2019 = (parseFloat(popChina2020) - parseFloat(popChina2019))
        //epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
    const timeJuliFirst2019 = 1561939200
    const timeJuliFirst2020 = 1593561600
        //epoch time gap between 2020 an 2019
    const gap20192020 = (timeJuliFirst2020 - timeJuliFirst2019);
    //growth total world population persons per second 
    const IndiaPopRate = (gapIndia2020Pop2019 / gap20192020)

    const ChinaPopRate = (gapChina2020Pop2019 / gap20192020)
        // current Unix timestamp in seconds
    const dateNow = Math.floor(new Date().getTime() * 0.001);
    //calculation of the world population at the moment
    const IndiaPopNow = (parseFloat(popIndia2019) + (parseFloat(IndiaPopRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))

    const ChinaPopNow = (parseFloat(popChina2019) + (parseFloat(ChinaPopRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
        //connection the HTML doc
    const obj = document.getElementById("IndiaTotal");
    obj.innerHTML = parseInt(IndiaPopNow).toLocaleString();

    const obj2 = document.getElementById("ChinaTotal");
    obj2.innerHTML = parseInt(ChinaPopNow).toLocaleString();

    //repitition time in milisecs of the function 
    setTimeout(currentPopCalc, 1000);
}
currentPopCalc()



////// TIME IN SELECTED CITIES

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