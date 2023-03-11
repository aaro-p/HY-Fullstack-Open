const express = require('express')
const app = express()
const morgan = require('morgan')
const _PORT = process.env.PORT || 3001
const tinyCustom =
    ':method :url :status :res[content-length] - :response-time ms :DATA'
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(tinyCustom))
morgan.token('DATA', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.get('/api/persons', (_, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/info', (_, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `Phonebook has info for ${
          persons.length
        } peple <br><br>${new Date()}`
      )
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  console.log(id)
  Person.findById(id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body
  // if (!body.name || !body.number) {
  //     return res.status(400).json({
  //         error: "name and number is required",
  //     });
  // }
  const postedPerson = new Person({
    name: body.name,
    number: body.number,
  })

  postedPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id

  const updatedNumber = {
    number: body.number,
  }

  Person.findByIdAndUpdate(id, updatedNumber, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHanlderMiddleWare = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHanlderMiddleWare)

app.listen(_PORT, () => {
  console.log(`Server running in port: ${_PORT}`)
})
