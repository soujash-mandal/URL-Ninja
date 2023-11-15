const DriveUrlModel = require("../../../models/driveUrl"); // Import the URL model

// Controller function for creating a new URL
const createDriveUrl = async (req, res) => {
  const {
    originalUrl,
    email,
    userId,
    image,
    title,
    site_name,
    description,
    parentFolder,
  } = req.body; // Extract the original URL, email, and userId from the request body

  // // Check if the URL already exists in the database
  // const existingUrl = await DriveUrlModel.findOne({ originalUrl, userId });

  // if (existingUrl) {
  //   console.log(existingUrl); // Log the existing URL (for debugging purposes)
  //   res.json({ message: "Already saved" }); // Respond with the existing URL data
  // } else {
  //   // Create a new URL document with the provided data
    const newUrl = new DriveUrlModel({
      originalUrl,
      userId,
      email,
      image,
      title,
      site_name,
      description,
      parentFolder,
    });

    // Save the new URL data to the database
    await newUrl.save();

    console.log(newUrl); // Log the newly created URL (for debugging purposes)
    res.json({ message: "Url is saved" }); // Respond with the newly created URL data
  }
// };

module.exports = {
  createDriveUrl,
};
