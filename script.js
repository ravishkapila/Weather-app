// Replace with your actual WeatherAPI key
const apiKey = "YOUR_API_KEY_HERE"; 

function getWeather() {
    const city = document.getElementById('citySelector').value;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weatherResult').innerHTML = `
                <h2>${data.location.name}</h2>
                <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
                <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                <img src="https:${data.current.condition.icon}" alt="weather icon">
                <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weatherResult').innerHTML = "Oops! Something went wrong.";
        });
}
