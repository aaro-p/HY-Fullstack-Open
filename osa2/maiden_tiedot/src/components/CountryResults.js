const CountryResults = ({ data, onClick }) => {
    return data.map((country, index) => (
        <div key={index}>
            {country.name.common}
            <button value={country.name.common} onClick={onClick}>
                show
            </button>
        </div>
    ));
};

export default CountryResults;
