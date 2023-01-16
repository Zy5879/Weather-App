import { doc } from 'prettier';

async function getWeather(type) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${type}?key=W2PYJ533JHBU5NHJ5JUZHAZ2A`,
      { mode: 'cors' }
    );
    const responseData = await response.json();
    console.log(responseData);

    populateHeader(responseData);
  } catch (error) {
    console.error(error);
  }
}

function populateHeader(obj) {
  const header = document.querySelector('h1');
  header.textContent = obj.address;

  const subheader = document.querySelector('h2');
  subheader.textContent = obj.currentConditions.conditions;

  const temp = document.querySelector('h3');
  temp.textContent = Math.round(obj.currentConditions.temp) + ' \u2109';

  const precprob = document.querySelector('h4');
  precprob.textContent =
    'Chance of Precipitation: ' +
    Math.round(obj.currentConditions.precipprob) +
    ' \u0025';
}

const form = document.querySelector('form');
form.querySelector('button').addEventListener('click', readResponse);

async function readResponse(e) {
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
    getWeather(cityState);
  } catch (error) {
    console.error(error);
  }
}

getWeather('Fayetteville,NC');
