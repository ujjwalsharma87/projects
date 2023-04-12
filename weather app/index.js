// DOM elements
const cityInput = document.getElementById("city");
const weatherInfo = document.querySelector(".weather-info");
const weatherTitle = document.querySelector(".weather-info h2");
const weatherTemp = document.querySelector(".weather-info .temp");
const weatherDesc = document.querySelector(".weather-info .description");
const weatherError = document.querySelector(".weather-info .error");

// API key
const apiKey = "0ff1f59038725166f2c36bf40e323e11";

// Get weather data from API
async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Display weather data on the page
function showWeather(data) {
  if (data == null) {
    weatherError.textContent = "Error retrieving weather data. Please try again.";
    weatherInfo.style.display = "block";
  } else {
    weatherTitle.textContent = `${data.name}, ${data.sys.country}`;
    weatherTemp.textContent = `${data.main.temp.toFixed(1)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    weatherError.textContent = "";
    weatherInfo.style.display = "block";
  }
}

// Submit form to get weather data
function handleSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") {
    weatherError.textContent = "Please enter a city name.";
    weatherInfo.style.display = "block";
  } else {
    getWeather(city).then(showWeather);
    cityInput.value = "";
  }
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", handleSubmit);
