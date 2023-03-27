let today = document.querySelector("#today");
let currentTime = document.querySelector("#current-time");
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
let day = days[now.getDay()];
today.innerHTML = `${day}`;

let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hour}:${minutes}`;

function displayWeather(response) {
  console.log(response);
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}&q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

function currentLocation(position){
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

}

function searchLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click",searchLocation);


city="Budapest";
searchCity(city);
