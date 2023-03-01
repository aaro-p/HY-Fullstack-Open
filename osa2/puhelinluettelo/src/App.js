import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([{}]);
    const [searchWord, setSearchWord] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            persons.some(
                (person) => person.name.toLowerCase() === newName.toLowerCase()
            )
        ) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons([...persons, { name: newName, number: newNumber }]);
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
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handeSearch} />
            <PersonForm
                onSubmit={handleSubmit}
                onNameChange={handeNameChange}
                onNumberChange={handeNumberChange}
            />
            <h2>Numbers</h2>
            <Persons
                searchWord={searchWord}
                persons={persons}
                filteredPersons={filteredPersons}
            />
        </div>
    );
};

export default App;
