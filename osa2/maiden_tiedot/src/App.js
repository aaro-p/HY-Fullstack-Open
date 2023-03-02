import { useEffect, useState } from "react";
import Search from "./components/Search";
import CountrySection from "./components/CountrySection";
import countryService from "./services/countryService";

function App() {
    const [countryData, setCountryData] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        countryService.fetchCountryData().then((data) => setCountryData(data));
    }, []);

    const handleInputChange = (event) => {
        setSearchWord(event.target.value);
    };

    const toggleCountry = (country) => {
        setSearchWord(country);
    };

    return (
        <div>
            <Search onChange={handleInputChange} />
            <CountrySection
                data={countryData}
                searchWord={searchWord}
                handleToggle={toggleCountry}
            />
        </div>
    );
}

export default App;
