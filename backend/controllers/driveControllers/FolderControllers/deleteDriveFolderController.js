const DriveFolderModel = require("../../../models/driveFolder"); // Import the Folder model

const deleteDriveFolder = async (req, res) => {
  const { email, userId, folderId } = req.body; // Extract user information from the request body
  console.log(userId, folderId);
  try {
    // Write code to delete one item from DriveFolderModel 
    // Example: Assuming you want to delete a Folder by its user ID
    const deletedFolder = await DriveFolderModel.findOneAndRemove({ _id:folderId, userId });
    console.log(deletedFolder);
    if (!deletedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Respond with a success message or the deleted Folder data
    res.json({ message: "Folder deleted", deletedFolder });
  } catch (error) {
    console.error("Error deleting Folder:", error);
    res.status(500).json({ message: "Error deleting Folder" });
  }
};

module.exports = {
  deleteDriveFolder,
};
