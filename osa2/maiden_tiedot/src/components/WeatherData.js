import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";

const WeatherData = ({ capital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService
            .getWeatherData(capital.toLowerCase())
            .then((response) => setWeather(response))
            .catch((error) => console.log(error));
    }, [capital]);

    return (
        <div>
            {weather && (
                <div>
                    <h2>Weather in {capital}</h2>
                    <p>temperature {weather.main.temp} Celsius</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].icon}
                    ></img>
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherData;
