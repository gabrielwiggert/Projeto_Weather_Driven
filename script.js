let startPos;
let userLat;
let userLon;

let geoSuccess = function(position) {
    alert("User located!");

    startPos = position;
    userLat = startPos.coords.latitude;
    userLon = startPos.coords.longitude;

    document.querySelector('body').innerHTML = startPos.coords.latitude + " " + startPos.coords.longitude;

    requestAPI();
};

let geoError = function(error) {
    switch(error.code) {
        case error.TIMEOUT:
        // The user didn't accept the callout
        alert("Access to location denied! Cannot run application.");
        break;
    }
};

navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

function requestAPI() {
    let promise = axios.post(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=f25110b0f83adb9f7c080ee182cd1d00&units=metric`);

    promise.then(renderWeather);
    promise.catch(error => alert('Request failed'));
}

function renderWeather(response) {
    data = response.data;

    document.querySelector('body').innerHTML = "Cidade: " + data.name + "<br>" +
    "Temperatura: " + data.main.temp + "<br>" + "Temperatura máxima: " + data.main.temp_max 
    + "<br>" + "Temperatura mínima: " + data.main.temp_min;
    
    console.log(data);
}