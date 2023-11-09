const UrlModel = require("../../models/url"); // Import the URL model

const deleteUrl = async (req, res) => {
  const { email, userId, urlId } = req.body; // Extract user information from the request body

  try {
    // Write code to delete one item from UrlModel
    // Example: Assuming you want to delete a URL by its user ID
    const deletedUrl = await UrlModel.findByIdAndDelete(urlId);

    if (!deletedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Respond with a success message or the deleted URL data
    res.json({ message: "URL deleted", deletedUrl });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ message: "Error deleting URL" });
  }
};

module.exports = {
  deleteUrl,
};
