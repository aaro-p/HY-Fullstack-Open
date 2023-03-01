import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getPersons = () => {
    const request = axios.get(baseURL);
    return request
        .then((response) => response.data)
        .catch((error) => error.message);
};

const createPerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson);
    return request.then((response) => response.data);
};

const updatePerson = (person) => {
    const { id } = person;
    const request = axios.put(`${baseURL}/${id}`, person);
    return request.then((response) => response.data);
};

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then((response) => response.data);
};

const personsService = { getPersons, createPerson, updatePerson, deletePerson };

export default personsService;
