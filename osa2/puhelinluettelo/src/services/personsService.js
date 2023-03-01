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
    return request
        .then((response) => response.data)
        .catch((error) => error.message);
};

const updatePerson = (person) => {
    const { id } = person;
    const request = axios.put(`${baseURL}/${id}`, person);
    return request
        .then((response) => response.data)
        .catch((error) => error.message);
};

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request
        .then((response) => response.data)
        .catch((error) => error.message);
};

// {
//   "persons":[
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ]
// }

const personsService = { getPersons, createPerson, updatePerson, deletePerson };

export default personsService;
