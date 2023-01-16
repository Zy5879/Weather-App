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
    populateBody(responseData);
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
    Math.round(obj.currentConditions.precipprob) + ' \u0025';
}

function populateBody(obj) {
  const forecastbody = document.querySelector('.forecast');
  const weatherForecast = obj.days;

  for (const data of weatherForecast) {
    const div = document.createElement('div');
    const myPara1 = document.createElement('p');
    // const myIcon = document.createElement('img');
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myPara4 = document.createElement('p');
    const myPara5 = document.createElement('p');

    myPara1.textContent = data.datetime;
    // myIcon.src = '';
    myPara2.textContent = Math.round(data.tempmax) + ' \u2109';
    myPara3.textContent = Math.round(data.tempmin) + ' \u2109';

    const dataconditions = data.conditions;
    const dataprecprob = Math.round(data.precipprob);
    myPara4.textContent = dataconditions;
    myPara5.textContent = dataprecprob + ' \u0025';

    div.append(myPara1, myPara2, myPara3, myPara4, myPara5);
    forecastbody.appendChild(div);
  }
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

    const forecastbody = document.querySelector('.forecast');
    while (forecastbody.firstChild) {
      forecastbody.removeChild(forecastbody.firstChild);
    }
    getWeather(cityState);
  } catch (error) {
    console.error(error);
  }
}

getWeather('Fayetteville,NC');
