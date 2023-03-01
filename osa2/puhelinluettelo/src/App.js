import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([{}]);
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        personsService.getPersons().then((response) => setPersons(response));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const personToUpdate = persons.filter(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        if (personToUpdate.length === 0) {
            personsService
                .createPerson({ name: newName, number: newNumber })
                .then((response) => setPersons([...persons, response]));
            setNewName("");
            setNewNumber("");
            return;
        } else {
            if (window.confirm(`${newName} is already added to phonebook`)) {
                const updateObject = personToUpdate.reduce((p) => {
                    return p;
                });
                personsService.updatePerson({
                    ...updateObject,
                    number: newNumber,
                });
            }
            personsService
                .getPersons()
                .then((response) => setPersons(response));
            setNewName("");
            setNewNumber("");
        }
    };

    const handeNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handeNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handeSearch = (event) => {
        setSearchWord(event.target.value);

        const filtered = persons.filter((person) =>
            person.name.toLowerCase().includes(event.target.value)
        );
        setFilteredPersons([...filtered]);
    };

    const handlePersonDelete = (personToDelete) => {
        const { name, id } = personToDelete;
        if (window.confirm(`Delete ${name} ?`)) {
            const newPersons = [
                ...persons.filter((person) => person.id !== id),
            ];
            personsService.deletePerson(id).then(setPersons(newPersons));
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handeSearch} />
            <PersonForm
                onSubmit={handleSubmit}
                onNameChange={handeNameChange}
                onNumberChange={handeNumberChange}
                name={newName}
                number={newNumber}
            />
            <h2>Numbers</h2>
            <Persons
                searchWord={searchWord}
                persons={persons}
                filteredPersons={filteredPersons}
                onClick={handlePersonDelete}
            />
        </div>
    );
};

export default App;
