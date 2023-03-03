const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook.kiy88hx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const name = process.argv[3];
const phoneNumber = process.argv[4];

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const ContactInfo = mongoose.model("PhoneBook", phoneBookSchema);

const contactInfo = new ContactInfo({
    name: name,
    number: phoneNumber,
});

if (process.argv.length === 3) {
    ContactInfo.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else {
    contactInfo.save().then((result) => {
        console.log(
            `added ${result.name} number ${result.number} to phonebook`
        );
        mongoose.connection.close();
    });
}
