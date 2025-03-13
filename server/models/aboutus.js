const mongoose = require("mongoose");
const aboutusSchema = new mongoose.Schema({
  heading1: String,
  heading2: String,
  heading3: String,
  description: String,
  bannerImgUrl: String,
  farmhouse_stays: {
    title: String,
    content: String,
    imageUrl: String,
  },
  farmhouse_events: {
    title: String,
    content: String,
    services: [String],
    imageUrl: String,
  },
  corporate_gatherings: {
    title: String,
    content: String,
    imageUrl: String,
  },
  amenities: {
    title: String,
    content: String,
    imageUrl: String,
  },
  mission: {
    title: String,
    content: String,
    imageUrl: String,
  },
  cta: {
    title: String,
    imageUrl: String,
  },
});
module.exports = mongoose.model("aboutus", aboutusSchema);
