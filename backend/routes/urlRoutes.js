// Import required modules and packages
const express = require("express");
const {createUrl} = require("../controllers/urlControllers/createUrlController"); // Import the controller function for creating a URL
const {deleteUrl} = require("../controllers/urlControllers/deleteUrlController"); // Import the controller function for deleting a URL
const {getAllUrls} = require("../controllers/urlControllers/getAllUrlsController"); // Import the controller function for retrieving all URLs
const clerkMiddleware = require("../middlewares/clerkMiddleware"); // Import the custom middleware
const { getUrl } = require("../controllers/urlControllers/getUrlController"); // Import the controller function for retrieving a single URL
const router = express.Router(); // Create an instance of an Express router

// Define routes

// Protected routes (Require clerkMiddleware for authentication)
router.post("/", clerkMiddleware, createUrl); // Define a route for creating a URL
router.delete("/", clerkMiddleware, deleteUrl); // Define a route for deleting a URL
router.get("/all", clerkMiddleware, getAllUrls); // Define a route for retrieving all URLs

// Public Routes (No authentication required)
router.get("/", getUrl); // Define a route for retrieving a single URL

module.exports = router; // Export the router for use in the application
