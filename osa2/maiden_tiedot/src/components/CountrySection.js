import CountryResults from "./CountryResults";
import CountryInfo from "./CountryInfo";

const CountrySection = ({ data, searchWord, handleToggle }) => {
    const countryList = [...data];

    const countries = countryList.filter(
        (country) =>
            country.name.common
                .toLowerCase()
                .indexOf(searchWord.toLowerCase()) !== -1
    );

    const setCountryToToggle = (event) => {
        handleToggle(event.target.value);
        console.log(event.target.value);
    };

    if (countries.length > 10) {
        return <p>Too many requests, speficy another filter</p>;
    }

    if (countries.length === 1) {
        return <CountryInfo countryData={countries[0]} />;
    }
    return (
        <div>
            <CountryResults data={countries} onClick={setCountryToToggle} />
        </div>
    );
};

export default CountrySection;
