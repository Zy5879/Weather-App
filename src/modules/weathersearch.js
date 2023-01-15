const form = document.querySelector('form');
form.querySelector('button').addEventListener('click', getWeather);

async function getWeather(e) {
  e.preventDefault();
  const input = document.querySelector('.city-search input');
  let cityState = input.value;
  input.value = '';

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityState}?key=W2PYJ533JHBU5NHJ5JUZHAZ2A 
      `,
      { mode: 'cors' }
    );
    const cityData = await response.json();
    const cityName = await cityData.address;
    const cityDays = await cityData.days;
    const cityDes = await cityData.description;

    const weatherData = {
      cityName,
      cityDays,
      cityDes,
    };

    console.log(weatherData);
    // console.log(cityData.address);
    // console.log(cityData.days[0].temp);
    // console.log(cityData.description);
  } catch (error) {
    console.log(error);
  }
}
