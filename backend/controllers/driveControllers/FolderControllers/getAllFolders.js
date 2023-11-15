const DriveFolderModel = require("../../../models/driveFolder"); // Import the URL model

// Controller function for retrieving all URLs associated with a specific userId
const getAllFolders = async (req, res) => {
  const { userId } = req.body; // Extract the userId from the request body
  const parentFolder = req.query.parentFolder;
  try {
    // Retrieve all URLs from the DriveFolderModel with the specified userId
    const allRootFolders = await DriveFolderModel.find({
      userId,
      parentFolder,
    }).sort({
      createdAt: -1,
    });

    // Respond with the list of retrieved URLs
    res.json(allRootFolders);
  } catch (error) {
    console.error("Error retrieving Folders of the user :", error); // Log an error message in case of an error
    res.status(500).json({ message: "Error retrieving Folders" }); // Respond with an error message and status code
  }
};

module.exports = {
  getAllFolders,
};
