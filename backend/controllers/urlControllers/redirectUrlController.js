const UrlModel = require("../../models/url"); // Import the URL model

// Controller function for redirecting to the mapped original URL and increasing clicks
const redirectUrl = async (req, res) => {
  const { id } = req.params; // Extract the "id" parameter from the request URL

  try {
    // Find the URL document with the matching "shortUrl" in UrlModel
    const urlData = await UrlModel.findOne({ shortUrl: id });

    if (urlData) {
      // If the URL is found, increment the clicks count
      urlData.clicks += 1;
      await urlData.save(); // Save the updated URL data with the incremented clicks

      // Perform a redirect to the original URL
      res.redirect(urlData.originalUrl);
    } else {
      // If the URL is not found, respond with a not found (404) status
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error("Error redirecting URL:", error); // Log an error message in case of an error
    res.status(500).json({ message: "Error redirecting URL" }); // Respond with an error message and status code
  }
};

module.exports = { redirectUrl };
