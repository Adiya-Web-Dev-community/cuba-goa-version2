const mongoose = require("mongoose");

const BookingSchema = {
  name: String,
  email: String,
  contact: Number,
  resortname:String,
  checkIn: String,
  checkOut: String,
  specialRequest: String,
  totalAmount: Number,
  bookingDate: String,
  bookingTime: String,
  reservationId: String,
  bookingStatus: String,
  client: mongoose.Schema.Types.ObjectId,
};

module.exports = mongoose.model("bookings", BookingSchema);
