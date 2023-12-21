const mongoose = require("mongoose");

const tableReservationSchema = new mongoose.Schema({
  name: String,
  contact: String,
  restaurantName: String,
  date: String,
  time: String,
  noOfGuests: Number,
});

module.exports = mongoose.model(
  "Restaurant-Reservation",
  tableReservationSchema
);
