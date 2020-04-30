//////////////// MIDDLE TOTAL POP

async function currentPopCalc() {
    //fetching the file and converting it to text
    const response = await fetch('/static/ChinaIndia2019-2020.csv');
    const data = await response.text();
    //Time Gaps
    //epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
    const timeJuliFirst2019 = 15619392000
    const timeJuliFirst2020 = 15935616000
        //epoch time gap between 2020 an 2019
    const gap20192020 = (timeJuliFirst2020 - timeJuliFirst2019);
    const dateNow = Math.floor(new Date().getTime() * 0.01);
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