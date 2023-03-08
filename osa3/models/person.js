const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const URL = process.env.MONGODB_URI;
console.log("connecting to ", URL);

mongoose
    .connect(URL)
    .then((resuult) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to mongodb", error.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});

module.exports = mongoose.model("Person", personSchema);