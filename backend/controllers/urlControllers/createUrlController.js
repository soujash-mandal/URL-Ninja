const UrlModel = require("../../models/url"); // Import the URL model
const shortid = require("shortid"); // Import the shortid library for generating short URLs

// Controller function for creating a new URL
const createUrl = async (req, res) => {
  const { originalUrl, email, userId, image, title, site_name, description } =
    req.body; // Extract the original URL, email, and userId from the request body

  // Check if the URL already exists in the database
  const existingUrl = await UrlModel.findOne({ originalUrl, userId });

  if (existingUrl) {
    console.log(existingUrl); // Log the existing URL (for debugging purposes)
    res.json({ message: "This Url is Already shortened By you" }); // Respond with the existing URL data
  } else {
    // Generate a unique short ID for the new URL
    const shortUrl = shortid.generate();

    // Create a new URL document with the provided data
    const newUrl = new UrlModel({
      originalUrl,
      shortUrl,
      userId,
      email,
      clicks: 0, // Initialize the click count to zero
      image,
      title,
      site_name,
      description,
    });

    // Save the new URL data to the database
    await newUrl.save();

    console.log(newUrl); // Log the newly created URL (for debugging purposes)
    res.json({ message: "Url has been shortened successfully" }); // Respond with the newly created URL data
  }
};

module.exports = {
  createUrl,
};
