const express = require("express");
const app = express();
const morgan = require("morgan");
const _PORT = process.env.PORT || 3001;
const tinyCustom =
    ":method :url :status :res[content-length] - :response-time ms :DATA";
const BASE_URL = "http://localhost:3001/api/notes";
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan(tinyCustom));
morgan.token("DATA", (req) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
});

let persons = [
    {
        name: "Arto Hellas",
        number: "040-1234567",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "34-56-123212",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
];

const generateId = () => {
    const maxId =
        persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
    return maxId + 1;
};

const namesMatch = (name) => {
    return persons.some((person) => person.name === name);
};

app.get("/api/persons", (_, res) => {
    res.json(persons);
});

app.get("/api/info", (_, res) => {
    const amountOfPersons = Object.keys(persons).length;
    res.send(
        `Phonebook has info for ${amountOfPersons} peple <br><br>${new Date()}`
    );
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((p) => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.post("/api/persons/", (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name and number is required",
        });
    }
    if (namesMatch(body.name)) {
        return res.status(400).json({
            error: "name must be unique",
        });
    }
    const postedPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(postedPerson);
    res.json(postedPerson);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

app.listen(_PORT, () => {
    console.log(`Server running in port: ${_PORT}`);
});
