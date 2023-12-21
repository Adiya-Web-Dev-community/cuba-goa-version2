var mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, default: "admin" },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
