const Country = ({ countryData, search }) => {
    const { name, area, languages, flags, capital } = countryData;
    console.log(search);
    return (
        <div>
            <h1>{name.common}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(languages).map((lang, index) => (
                    <li key={index}>{lang}</li>
                ))}
            </ul>
            <img alt={flags.alt} src={flags.png}></img>
        </div>
    );
};

export default Country;
