// CURRENT DATE

let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let currentHour = addZero(currentDate.getHours());
let currentMinute = addZero(currentDate.getMinutes());

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

let formattedDate = `${currentDay} ${currentHour}:${currentMinute}`;
let dateTime = (document.querySelector(
  "#date-time"
).innerHTML = `${formattedDate}`);

// END CURRENT DATE

// GET WEATHER AND CITY

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector(".current-img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  celsiusTemp = response.data.main.temp;
}

function getCity(city) {
  let unitsMetric = "metric";
  let apiKey = "f33d05dcaa068a4dd766639aa37be9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitsMetric}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// END GET WEATHER AND CITY

// CONVERT UNITS

function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  cTemp.classList.remove("active");
  fTemp.classList.add("active");
}

let fTemp = document.querySelector("#f-temp");
fTemp.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemp);
  cTemp.classList.add("active");
  fTemp.classList.remove("active");
}

let cTemp = document.querySelector("#c-temp");
cTemp.addEventListener("click", celsius);

// END CONVERT UNITS

// CURRENT LOCATION BUTTON

function retrievePosition(position) {
  let apiKey = "f33d05dcaa068a4dd766639aa37be9b8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
  cTemp.classList.add("active");
  fTemp.classList.remove("active");
}

function retrievePositionF(position) {
  let apiKey = "f33d05dcaa068a4dd766639aa37be9b8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayCurrentLocationF(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePositionF);
}

let currentLocButton = document.querySelector("#current-loc");
currentLocButton.addEventListener("click", displayCurrentLocation);

let celsiusTemp = 0;

getCity("Bangkok");

// END CURRENT LOCATION BUTTON
