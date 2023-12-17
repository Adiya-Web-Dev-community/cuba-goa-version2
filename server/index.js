const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const path = require("path");
const port = process.env.PORT || 4000;

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(require("./router/admin-accounts"));
app.use(require("./router/customer-accounts"));
app.use(require("./router/post-property"));

app.use(require("./router/spa"));
app.use(require("./router/booking-form"));
app.use(require("./router/rating"));
app.use(require("./router/about-us"));
app.use(require("./router/contactus"));
app.use(require("./router/restaurantBooking"));
app.use(require("./router/wedding-enquiry"));
app.use(require("./router/chat"));
app.get("/", (req, res) => {
  try {
    res.send("Welome to Cuba Goa!");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node api is running on port ${port}`);
      console.log("welcome to cuba-goa");
    });
  })
  .catch((error) => {
    console.log(error);
  });
