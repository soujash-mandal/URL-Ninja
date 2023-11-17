// Import required modules and packages
const express = require("express");
const clerkMiddleware = require("../middlewares/clerkMiddleware"); // Import the custom middleware
const {
  createFolder,
} = require("../controllers/driveControllers/FolderControllers/createFolderController");
const {
  createDriveUrl,
} = require("../controllers/driveControllers/UrlControllers/createDriveUrlController");
const {
  getAllFolders,
} = require("../controllers/driveControllers/FolderControllers/getAllFolders");
const {
  getAllDriveUrls,
} = require("../controllers/driveControllers/UrlControllers/getAllUrls");
const {
  deleteDriveUrl,
} = require("../controllers/driveControllers/UrlControllers/deleteDriveUrlController");
const {
  deleteDriveFolder,
} = require("../controllers/driveControllers/FolderControllers/deleteDriveFolderController");
const {
  getDriveFolder,
} = require("../controllers/driveControllers/FolderControllers/getDriveFolderController");
const router = express.Router(); // Create an instance of an Express router

// Define routes

router.post("/folder", clerkMiddleware, createFolder);
router.get("/folder/all", clerkMiddleware, getAllFolders);
router.get("/folder", clerkMiddleware, getDriveFolder);
router.delete("/folder", clerkMiddleware, deleteDriveFolder);

router.get("/url", clerkMiddleware, getAllDriveUrls);
router.post("/url", clerkMiddleware, createDriveUrl);
router.delete("/url", clerkMiddleware, deleteDriveUrl);

module.exports = router; // Export the router for use in the application
