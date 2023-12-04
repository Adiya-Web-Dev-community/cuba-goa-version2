const express = require("express");
const adminMiddleware = require('../middleware/admin')
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Admin = require("../models/admin-accounts");
const Contactus = require("../models/contactus");


// Register
router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newRegistration = await Admin.create({
      email: email,
      password: hash,
      name: name,
    });

    res.status(200).json({ status: true, message: "succefully registerd" });
  } catch (er) {
    res.status(400).json({ status: false, message: er.message });
  }
});



// Login //
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // return res.status(400).json({email: email , password: password });
    const user = await Admin.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "Email not found" });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res
      .status(200)
      .json({ status: true, message: "succes login", username: user.name, token: token });
  } catch (er) {
    res.status(400).json({ status: false, message: er.message });
  }
});




module.exports = router;