    const hours = 1
    const miliSecondFactor = 1000
    const totalTimeRun = 3600 * hours * miliSecondFactor

    async function currentPopCalc() {
        const response = await fetch('countries2019-2020.csv');
        const data = await response.text();
        const pop2019 = data.split('\n').slice(236)[0].split(',')[1];
        const pop2020 = data.split('\n').slice(236)[0].split(',')[2];
        const gapPop2020Pop2019 = (parseFloat(pop2020) - parseFloat(pop2019))


        const timeJuliFirst2019 = 1561939200
        const timeJuliFirst2020 = 1593561600
        const gap20192020 = (timeJuliFirst2020 - timeJuliFirst2019);
        const popRate = (gapPop2020Pop2019 / gap20192020)
            //console.log(popRate)

        const dateNow = Math.floor(new Date().getTime() * 0.001); // Unix timestamp in milliseconds
        const popNow = (parseFloat(pop2019) + (parseFloat(popRate) * (parseFloat(dateNow) - parseFloat(timeJuliFirst2019))))
        console.log(pop2019);
        const obj = document.getElementById("c");
        obj.innerHTML = parseInt(popNow).toLocaleString();
        setTimeout(currentPopCalc, 100);
    }
    currentPopCalc()


    //







    // animateValue("c", 7500000000, 8000000000, totalTimeRun);



    // function animateValue(id, start, end, duration) {
    //     const range = end - start;
    //     let current = start;
    //     const increment = end > start ? 1 : -1;
    //     const stepTime = Math.abs(Math.floor(duration / range));
    //     const obj = document.getElementById(id);
    //     const timer = setInterval(function() {
    //         current += increment;
    //         obj.innerHTML = current.toLocaleString();
    //         if (current == end) {
    //             clearInterval(timer);
    //         }
    //     }, stepTime);
    // }


    // animateValue("c", 7500000000, 8000000000, totalTimeRun);