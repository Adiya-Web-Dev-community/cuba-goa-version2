const mongoose = require("mongoose");

const weddingEnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  eventType: String,
  eventDate: String,
  eventTime: String,
  noOfGuests: Number,
  message: String,
});

module.exports = mongoose.model("wedding-enquiry", weddingEnquirySchema);
