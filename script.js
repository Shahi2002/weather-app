const apiKey = "b714fe0884d682b44fafbac58e32d5ec";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const result = document.getElementById("weatherResult");

    if (city === "") {
        error.innerText = "Please enter a city name.";
        return;
    }

    loading.style.display = "block";
    error.innerText = "";
    result.style.display = "none";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        console.log("Request URL:", url);

        const response = await fetch(url);

        const data = await response.json();

        console.log("API Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong.");
        }

        document.getElementById("cityName").innerText =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").innerText =
            `Temperature: ${data.main.temp} °C`;

        document.getElementById("condition").innerText =
            `Condition: ${data.weather[0].description}`;

        document.getElementById("humidity").innerText =
            `Humidity: ${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `Wind Speed: ${data.wind.speed} m/s`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weatherIcon").alt =
            data.weather[0].description;

        result.style.display = "block";

    }
    catch (err) {

        console.error(err);

        error.innerText = err.message;
    }
    finally {

        loading.style.display = "none";
    }
}

document
    .getElementById("cityInput")
    .addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            getWeather();
        }

    });