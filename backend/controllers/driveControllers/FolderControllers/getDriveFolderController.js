const DriveFolderModel = require("../../../models/driveFolder"); // Import the URL model

// Controller function for retrieving all URLs associated with a specific userId
const getDriveFolder = async (req, res) => {
  const { userId } = req.body; // Extract the userId from the request body
  const folderId = req.query.folderId;
  try {
    const FolderInfo = await DriveFolderModel.findOne({
      userId,
      _id: folderId,
    });
    console.log(FolderInfo);
    res.json(FolderInfo);
  } catch (error) {
    console.error("Error retrieving Folders of the user :", error); // Log an error message in case of an error
    res.status(500).json({ message: "Error retrieving Folders" }); // Respond with an error message and status code
  }
};

module.exports = {
  getDriveFolder,
};
