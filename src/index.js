// feature 1
let h2 = document.querySelector("#current-day");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
h2.innerHTML = `Last updated: ${currentDay} ${currentHours}:${currentMinutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="card">
                  <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="forecast-icon"/></div>
                  <div class="card-body">
                    <p class="card-text week-weather">
                      ${formatDay(forecastDay.dt)}
                      <br />
                      <span class="forecast-high">${Math.round(
                        forecastDay.temp.max
                      )}°</span> <span class="forecast-low">${Math.round(
          forecastDay.temp.min
        )}°</span>
                    </p>
                  </div>
                </div>`;
    }
    forecastHTML = forecastHTML + `</div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

function cityTempSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  cityNameSearch(searchInput);
}

let citySearch = document.querySelector("#search-here");
citySearch.addEventListener("submit", cityTempSearch);

function getForecast(coordinates) {
  let apiKey = "b28f15f03c06aa01b59bd379d3000b9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let tempData = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temperature");
  tempNow.innerHTML = `${tempData}`;
  let humidity = document.querySelector("#humidity");
  let humidityData = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityData}%`;
  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedData = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed: ${windSpeedData} mi/hr`;
  let tempDescription = document.querySelector("#weather-description");
  tempDescription.innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b28f15f03c06aa01b59bd379d3000b9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
function cityNameSearch(event) {
  let city = document.querySelector("#search-input").value;
  search(city);
}
search("Honolulu");
function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "b28f15f03c06aa01b59bd379d3000b9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCurrentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", displayCurrentData);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  convertCtoF.classList.remove("active");
  convertFtoC.classList.add("active");
}
let convertFtoC = document.querySelector("#celsius-link");
convertFtoC.addEventListener("click", displayCelsius);

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
  convertCtoF.classList.add("active");
  convertFtoC.classList.remove("active");
}
let convertCtoF = document.querySelector("#fahrenheit-link");
convertCtoF.addEventListener("click", displayFahrenheit);

let fahrenheitTemperature = null;
