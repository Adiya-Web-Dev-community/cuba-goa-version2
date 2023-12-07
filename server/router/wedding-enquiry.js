const router = require("express").Router();
const WeddingEnquiryModel = require("../models/weddingEnquiry");

router.post("/wedding-enquiry", async (req, resp) => {
  try {
    const weddingEnquiry = await WeddingEnquiryModel.create(req.body);
    resp.json({
      success: true,
      message: "Thanks! We'll get back to you soon",
      data: weddingEnquiry,
    });
  } catch (err) {
    resp.json({ success: false, message: err });
  }
});

module.exports = router;
