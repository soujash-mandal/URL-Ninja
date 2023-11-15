// models/url.js
const mongoose = require("mongoose");

const driveUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
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
    parentFolder: {
      type: String,
      required: true,
    },
    image: String,
    title: String,
    site_name: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DriveUrl", driveUrlSchema);
