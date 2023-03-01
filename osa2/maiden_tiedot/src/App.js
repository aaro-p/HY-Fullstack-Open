import { useEffect, useState } from "react";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
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

    return (
        <div>
            <Search onChange={handleInputChange} />
            <SearchResults data={countryData} searchWord={searchWord} />
        </div>
    );
}

export default App;
