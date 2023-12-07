const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const ReserveTable = require("../models/restaurantReservation");

router.post(
  "/reserve-table",
  [
    body("date").notEmpty().withMessage("Please select date"),
    body("time").notEmpty().withMessage("Please select time"),
    body("noOfGuests").notEmpty().withMessage("Please select number of guests"),
  ],
  async (req, resp) => {
    console.log(req.body);

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.json({ success: false, message: errors.array() });
      }
      const newReservation = await ReserveTable.create(req.body);
      console.log(newReservation);
      resp.json({ success: true, message: "successfully reserved table" });
    } catch (err) {
      console.log(err);
      resp.json({ success: false });
    }
  }
);

module.exports = router;
