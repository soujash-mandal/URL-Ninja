// Import required modules and packages
const express = require("express");
const clerkMiddleware = require("../middlewares/clerkMiddleware"); // Import the custom middleware
const { createFolder } = require("../controllers/driveControllers/FolderControllers/createFolderController");
const { createDriveUrl } = require("../controllers/driveControllers/UrlControllers/createDriveUrlController");
const { getAllFolders } = require("../controllers/driveControllers/FolderControllers/getAllFolders");
const { getAllDriveUrls } = require("../controllers/driveControllers/UrlControllers/getAllUrls");
const { deleteDriveUrl } = require("../controllers/driveControllers/UrlControllers/deleteDriveUrlController");
const router = express.Router(); // Create an instance of an Express router

// Define routes

router.post("/folder", clerkMiddleware, createFolder); // Define a route for creating a URL
router.get("/folder", clerkMiddleware, getAllFolders); // Define a route for deleting a URL


router.get("/url", clerkMiddleware, getAllDriveUrls); // Define a route for retrieving all URLs
router.post("/url", clerkMiddleware, createDriveUrl); // Define a route for creating a URL
router.delete("/url", clerkMiddleware, deleteDriveUrl); // Define a route for creating a URL

module.exports = router; // Export the router for use in the application
