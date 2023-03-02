import WeatherData from "./WeatherData";

const CountryInfo = ({ countryData }) => {
    const { name, area, languages, flags, capital } = countryData;
    return (
        <>
            <div>
                <h1>{name.common}</h1>
                <p>capital {capital[0]}</p>
                <p>area {area}</p>
                <h3>Languages:</h3>
                <ul>
                    {Object.values(languages).map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))}
                </ul>
                <img alt={flags.alt} src={flags.png}></img>
            </div>
            <div>
                <WeatherData capital={capital[0]} />
            </div>
        </>
    );
};

export default CountryInfo;
