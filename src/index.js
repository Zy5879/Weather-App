import { getWeather, weatherObject } from './modules/weathersearch';
import style from './styles/style.css';
import weather from './assets/weatherlogo.svg';

const weatherlogo = document.getElementById('weatherlogo');
weatherlogo.src = weather;
