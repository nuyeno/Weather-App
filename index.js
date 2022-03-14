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
h2.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

// Week 5
function cityTempSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  cityNameSearch(searchInput);
}

let citySearch = document.querySelector("#search-here");
citySearch.addEventListener("submit", cityTempSearch);

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let tempData = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temperature");
  tempNow.innerHTML = `${tempData}°F`;
  let humidity = document.querySelector("#humidity");
  let humidityData = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityData}%`;
  let tempHigh = document.querySelector("#high");
  let tempHighData = Math.round(response.data.main.temp_max);
  let tempLow = document.querySelector("#low");
  let tempLowData = Math.round(response.data.main.temp_min);
  tempHigh.innerHTML = `High: ${tempHighData}°F`;
  tempLow.innerHTML = `Low: ${tempLowData}°F`;
  let tempDescription = document.querySelector("#weather-description");
  tempDescription.innerHTML = response.data.weather[0].main;
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

// Week 4 Bonus
function toCelsius(click) {
  click.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `16`;
}
let convertTtoC = document.querySelector("#celsius-link");
convertTtoC.addEventListener("click", toCelsius);

function toFahrenheit(click) {
  click.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `66`;
}
let convertCtoF = document.querySelector("#fahrenheit-link");
convertCtoF.addEventListener("click", toFahrenheit);
