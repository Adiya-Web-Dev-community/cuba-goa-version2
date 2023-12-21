const mongoose = require('mongoose');


const contactusSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contact: String,
    yourOrganization: String,
    message: String
})

const Contactus = mongoose.model("Contactus", contactusSchema)
module.exports = Contactus;