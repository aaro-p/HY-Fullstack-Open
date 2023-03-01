import Results from "./Results";
import Country from "./Country";
import { useState } from "react";

const SearchResults = ({ data, searchWord }) => {
    const [search, setSearch] = useState(searchWord);

    const countryNames = data.map((d) => d);
    const searchResults = countryNames.filter((country) =>
        country.name.common.toLowerCase().includes(searchWord)
    );

    const getSpecificCountry = countryNames.filter((country) =>
        country.name.common.toLowerCase().includes(search)
    );

    if (searchResults.length > 10) {
        return <p>Too many requests, speficy another filter</p>;
    }

    if (searchResults.length === 1) {
        return (
            <Country
                countryData={searchResults[0]}
                search={getSpecificCountry}
            />
        );
    }

    const handleShowCountry = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    return (
        <div>
            <Results data={searchResults} onClick={handleShowCountry} />
        </div>
    );
};

export default SearchResults;
