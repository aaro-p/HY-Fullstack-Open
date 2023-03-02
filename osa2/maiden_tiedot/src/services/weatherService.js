import axios from "axios";

//prettier-ignore
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const UNITS = "metric";

const getWeatherData = (city) => {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${UNITS}&appid=${API_KEY}`;
    const request = axios.get(queryURL).then((response) => response.data);
    return request;
};

const weatherService = { getWeatherData };

export default weatherService;
