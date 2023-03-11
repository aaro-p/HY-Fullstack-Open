const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const URL = process.env.MONGODB_URI
console.log('connecting to ', URL)

mongoose
  .connect(URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongodb', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{6,}$/.test(v)
      },
      message: (props) => `${props.value} is not valid phone number`,
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  },
})

module.exports = mongoose.model('Person', personSchema)
