window.addEventListener('load', () => { //run fun when page is loaded
    let long;
    let lat;

    //selectors
    const locationSection = document.querySelector('.location');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const temperatureDescription = document.querySelector('.temperature-description');
    const iconImg = document.querySelector('.icon');
    const temperatureSection = document.querySelector('.degree-section');
    const pressureSection = document.querySelector('.pressure-section');
    const windSection = document.querySelector('.wind-section');
    // const temperatureSpan = document.querySelector('.degree-section span');
    const pressureValue = document.querySelector('.pressure-value');
    const windValue = document.querySelector('.wind-value');
    const windDirection = document.querySelector('.wind-direction');
    const windDirectionIcon = document.querySelector('.wind-section i');
    const loadingDiv = document.querySelector('.loading');
    const tempVal = document.querySelector('.temp-val');
    const tempValC = document.querySelector('.temp-val-C');
    const temperatureDegreeC = document.querySelector('.temperature-degree-C');
    // const loadingIcon = document.querySelector('.loading i');
    // const loadingText = document.querySelector('.loading h2');

    if (navigator.geolocation) { //built in function
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            let apiToken;
            const proxy = 'https://cors-anywhere.herokuapp.com/'; //so we can get data with local host
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiToken}`;

            fetch(api) //gets data from api
                .then(response => { //when we get all the data we go further
                    return response.json(); //converting response from JSON to JS object
                })
                .then(data => {
                    console.log(data);
                    const { temp, pressure } = data.main;
                    const { country } = data.sys;
                    const { description, icon } = data.weather[0];
                    const { speed, deg } = data.wind;

                    //set DOM Elements from the API
                    locationTimezone.textContent = `${data.name} / ${country}`;
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    pressureValue.textContent = pressure;
                    windValue.textContent = speed;
                    windDirection.textContent = deg;

                    //rotate wind arrow
                    windDirectionIcon.style.transform = `rotate(${deg}deg)`;

                    //formula for celsius
                    const celsius = Math.round(temp - 273.15);
                    temperatureDegreeC.textContent = celsius;

                    //set icon
                    // setIcons(icon, document.querySelector('.icon'));
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    iconImg.setAttribute('src', iconUrl);

                    //change temperature to Celsius/Kelvin
                    temperatureSection.addEventListener('click', () => {
                        tempVal.classList.toggle('hide');
                        tempValC.classList.toggle('show');
                    });

                    //change temperature to Celsius/Kelvin
                    // temperatureSection.addEventListener('click', () => {
                    //     if (temperatureSpan.textContent === 'K') {
                    //         temperatureSpan.textContent = 'C';
                    //         temperatureDegree.textContent = celsius;
                    //     } else {
                    //         temperatureSpan.textContent = 'K';
                    //         temperatureDegree.textContent = temp;
                    //     }
                    // })

                    //hide loading screen
                    loadingDiv.classList.add('active');

                    setTimeout(() => {
                        //show location section
                        locationSection.classList.add('active');
                        //show weather data
                        temperatureSection.classList.add('section-active');
                        setTimeout(() => pressureSection.classList.add('section-active'), 500);
                        setTimeout(() => windSection.classList.add('section-active'), 1000);
                    }, 650);

                })
        });
    }
})