// models/url.js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    clicks: {
      type: Number,
      required: true,
    },
    image: String,
    title: String,
    site_name: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
