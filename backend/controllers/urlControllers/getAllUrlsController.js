const UrlModel = require("../../models/url"); // Import the URL model

// Controller function for retrieving all URLs associated with a specific userId
const getAllUrls = async (req, res) => {
  const { userId } = req.body; // Extract the userId from the request body

  try {
    // Retrieve all URLs from the UrlModel with the specified userId
    const allUrls = await UrlModel.find({ userId }).sort({ createdAt: -1 });

    // Respond with the list of retrieved URLs
    res.json(allUrls);
  } catch (error) {
    console.error("Error retrieving URLs:", error); // Log an error message in case of an error
    res.status(500).json({ message: "Error retrieving URLs" }); // Respond with an error message and status code
  }
};

module.exports = {
  getAllUrls,
};
