import axios from "axios";
const baseURL = "https://restcountries.com/v3.1/all";

const fetchCountryData = () => {
    const request = axios.get(baseURL);
    return request.then((response) => response.data);
};

const countryService = {
    fetchCountryData,
};

export default countryService;
