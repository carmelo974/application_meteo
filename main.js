const loader = document.querySelector(".loader");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      const long = location.coords.longitude;
      const lat = location.coords.latitude;
      getWeatherData(long, lat);
    },
    () => {
      loader.textContent =
        "Vous avez refusé la géolocalisation, l'application ne peut pas fontionner, veuillez l'activer. ";
    }
  );
}

async function getWeatherData(long, lat) {
  try {
    const results = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=a7725b21fb3647ebdddeb72a81920bd8`
    );

    if (!results.ok) {
      throw new Error(`Erreur: ${results.status}`);
    }

    const data = await results.json();
    console.log(data);
    loader.classList.add("fade-out");
  } catch (error) {
    loader.textContent = error;
  }
}
