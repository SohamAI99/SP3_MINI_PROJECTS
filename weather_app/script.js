// Mock Weather Data API since we don't have an API key
// This allows the app to work flawlessly directly in the browser
const mockWeatherData = {
    "london": { temp: 15, condition: "Rainy", humidity: 82 },
    "new york": { temp: 22, condition: "Cloudy", humidity: 65 },
    "mumbai": { temp: 32, condition: "Sunny", humidity: 70 },
    "tokyo": { temp: 18, condition: "Clear", humidity: 55 },
    "paris": { temp: 17, condition: "Partly Cloudy", humidity: 60 }
};

// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

const tempElement = document.getElementById("temp");
const cityElement = document.getElementById("city-name");
const conditionElement = document.getElementById("condition");
const humidityElement = document.getElementById("humidity");

/**
 * Checks mock data to see if we have weather for this city
 * @param {string} city - The name of the city to search
 */
function fetchWeather(city) {
    // Convert to lowercase to match our mock data keys safely
    const lowerCaseCity = city.toLowerCase();

    // Check if city exists in our mock data
    if (mockWeatherData[lowerCaseCity]) {
        // City found -> Get Data
        const data = mockWeatherData[lowerCaseCity];
        
        // Update DOM elements using fetched data
        cityElement.textContent = capitalizeFirstLetter(city);
        tempElement.textContent = data.temp + "°C";
        conditionElement.textContent = data.condition;
        humidityElement.textContent = data.humidity + "%";
        
        // Show weather info and hide error
        weatherInfo.style.display = "block";
        errorMessage.style.display = "none";
    } else {
        // City not found -> Show Error
        weatherInfo.style.display = "none";
        errorMessage.style.display = "block";
    }
}

/**
 * Helper formatter to make city names look capitalized
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if(city !== "") {
        fetchWeather(city);
    }
});

// Add event listener to search input to allow pressing the 'Enter' key
searchInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        const city = searchInput.value.trim();
        if(city !== "") {
            fetchWeather(city);
        }
    }
});
