function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#degreeNumber");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  let temperature = Math.floor(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"id="img" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "1b099ef35faf21o7cfb3ad6cete3a47b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function hundleSubmitButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = `1b099ef35faf21o7cfb3ad6cete3a47b`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }"  class="weather-forecast-img" />

            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}° </strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}
let button = document.querySelector("#submit-form");
button.addEventListener("submit", hundleSubmitButton);
searchCity("kabul");
