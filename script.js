'use strict'

// select user input 
const userInput = document.querySelector('.user-input');

// select container of weathers 
const container = document.querySelector('.container');

// select error label
const error = document.querySelector('.error');

// create ajax 
const addWeather = () => {

    // check if user value is true
    if(userInput.value){

        // create ajax
        const req = new XMLHttpRequest();
        req.open('GET',`https://api.weatherapi.com/v1/current.json?key=ad43db047f9e4c8ea01200548211607&q=${userInput.value}&aqi=no`);
        req.send();
        req.addEventListener('load',()=>{
            console.log('status : ',req.status)

            // check if response is ok 
            if(req.status === 200){

                // clear error label if user input true
                clearAll();

                // store response massage in variable and convert it to JSON 
                const data = JSON.parse(req.responseText)
                console.log(data);

                // create variabe of data which show them in container
                const ele = `
                        <img src= \"${data.current.condition.icon} \" alt="weather image"/>
                        <h2>City: <span>${data.location.name}</span></h2>
                        <h3>Country: <span>${data.location.country}</span></h3>
                        <p>Cloud Number: <span>${data.current.cloud}</span></p>
                        <p>Sky: <span>${data.current.condition.text}</span></p>
                        <p>Temprature: <span>${data.current.temp_c}</span></p>
                `;

                // show data in container
                const weatherCity = document.createElement('div');
                weatherCity.innerHTML = ele;
                container.prepend(weatherCity);
            } else {
                // if user input is invalid city name throw error massage
                document.querySelector('.error').textContent = 'wrong city: please write city name right'
            }
     
        });
    }
} 

// edit enter click in input 
userInput.addEventListener('keyup', (event)=>{
    if(event.key === 'Enter') addWeather();
});


// clear error text
const clearAll =  () => {
    error.textContent = '';
    userInput.value = '';
}