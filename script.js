const apiKey = "20ca60e0c34c4b319cb51519252904"; // your real WeatherAPI key

const quotes = {
  "Sunny": ["It's a bright day — shine on! 😎", "Sunglasses ready! 🌞"],
  "Partly cloudy": ["A little cloud, a lot of sunshine! ☁️☀️"],
  "Cloudy": ["Perfect day for coffee and cozy vibes ☁️"],
  "Overcast": ["Gray skies, colorful minds! 🎨"],
  "Rain": ["Don't forget your umbrella ☔", "Dance in the rain! 💃"],
  "Snow": ["Time for a snowball fight! ❄️"],
  "Mist": ["Misty moods call for mystery novels 📚"],
  "Fog": ["Drive safe, the world is a blur 🌫️"],
  "Thunderstorm": ["Nature's light show! ⚡"]
};

function getQuote(condition) {
  const keys = Object.keys(quotes);
  for (let key of keys) {
    if (condition.includes(key)) {
      const options = quotes[key];
      return options[Math.floor(Math.random() * options.length)];
    }
  }
  return "Enjoy the weather!";
}

function getWeather(lat, lon) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const cityName = data.location.name;
      const tempC = data.current.temp_c;
      const conditionText = data.current.condition.text;
      const iconUrl = "https:" + data.current.condition.icon;
      const astro = data.forecast.forecastday[0].astro;

      document.getElementById('city').textContent = cityName;
      document.getElementById('temperature').textContent = `${tempC}°C`;
      document.getElementById('condition').textContent = conditionText;
      document.getElementById('icon').src = iconUrl;
      document.getElementById('sunrise').textContent = astro.sunrise;
      document.getElementById('sunset').textContent = astro.sunset;
      document.getElementById('moonrise').textContent = astro.moonrise;
      document.getElementById('moonset').textContent = astro.moonset;
      document.getElementById('quote').textContent = getQuote(conditionText);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      document.getElementById('city').textContent = "Couldn't load weather.";
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon);
    },
    error => {
      console.error('Geolocation error:', error);
      document.getElementById('city').textContent = "Location access denied.";
    }
  );
} else {
  document.getElementById('city').textContent = "Geolocation not supported.";
}
