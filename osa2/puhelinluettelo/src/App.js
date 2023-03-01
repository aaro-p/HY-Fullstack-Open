import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([{}]);
    const [searchWord, setSearchWord] = useState("");
    const [message, setMessage] = useState(null);

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
                .then((response) => {
                    setPersons([...persons, response]);
                    setMessage({
                        message: `${response.name} added to phonebook`,
                        type: "info",
                    });
                    setNewName("");
                    setNewNumber("");
                });
            setTimeout(() => {
                setMessage(null);
            }, 4000);
            return;
        } else {
            if (window.confirm(`${newName} is already added to phonebook`)) {
                const updateObject = personToUpdate.reduce((p) => {
                    return p;
                });
                personsService
                    .updatePerson({
                        ...updateObject,
                        number: newNumber,
                    })
                    .then((result) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== result.id ? person : result
                            )
                        );
                        setMessage({
                            message: `${result.name}'s number updated`,
                            type: "info",
                        });
                    });
                setNewNumber("");
                setNewName("");
                setTimeout(() => {
                    setMessage(null);
                }, 4000);
            }
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
            personsService
                .deletePerson(id)
                .then(() => {
                    setPersons(newPersons);
                    setMessage({
                        message: `${name} deleted succesfully from phonebook`,
                        type: "info",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setMessage({
                        message: `User ${name} has already deleted from server`,
                        type: "error",
                    });
                });
            setTimeout(() => {
                setMessage(null);
            }, 4000);
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} notificationType={message} />
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
