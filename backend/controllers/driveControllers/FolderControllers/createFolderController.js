const DriveFolderModel = require("../../../models/driveFolder"); // Import the URL model

// Controller function for creating a new URL
const createFolder = async (req, res) => {
  const { email, userId, name ,parentFolder } = req.body; // Extract the original URL, email, and userId from the request body
    const newFolder = new DriveFolderModel({
      userId,
      email,
      name,
      parentFolder
    });

    // Save the new URL data to the database
    await newFolder.save();

    console.log(newFolder); // Log the newly created URL (for debugging purposes)
    res.json({ message: "✅ Folder created" }); // Respond with the newly created URL data
  }
// };

module.exports = {
  createFolder,
};
