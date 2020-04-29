//////////////// MIDDLE TOTAL POP

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
    const obj = document.getElementById("i");
    obj.innerHTML = parseInt(popNow).toLocaleString();
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