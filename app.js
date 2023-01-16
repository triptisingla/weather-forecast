const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

// input box ko choose karlo dom(document) se, taaki uske andar ki value utha paana possible ho
const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', (event) => {
    // console.log(event);
    if(event.key == "Enter") {
        console.log(searchInputBox.value);
        let city = searchInputBox.value;
        getWeatherReport(city);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// url = https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=bab281d79e5f1e9755a68d754cc313e7&units=metric


function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport)
    .catch((err)=>{
        console.log(err);
    })
}

function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = weather.name+', '+weather.sys.country;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } else if(weatherType.textContent == 'Mist') {
    
        document.body.style.backgroundImage = "url('images/mist.jpeg')";
        
    } else if(weatherType.textContent == 'Smoke') {
    
        document.body.style.backgroundImage = "url('images/smoke.jpeg')";
        
    } 
}


function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    
    return `${date} ${month} (${day}), ${year}`;
}



