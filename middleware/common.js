const jwt = require("jsonwebtoken");
require("dotenv").config();
const Customer = require("../models/customer-accounts");
const Admin = require("../models/admin-accounts");
const adminMiddleware = async (req, resp, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);

      const customer = await Customer.findOne({ _id });
      const admin = await Admin.findOne({ _id });

      if (customer) {
        req.accountId = _id;
        req.userType = "customer";
        next();
      } else if (admin) {
        req.accountId = _id;
        req.userType = "admin";
        next();
      }
    } else {
      console.log("Access denied");
      resp.json({ success: false, message: "Access denied" });
    }
  } catch (err) {
    console.log("err in admin middleware");
    resp.json({ success: false, message: err });
  }
};

module.exports = adminMiddleware;
