// Import required modules and packages
const express = require("express"); // Express.js for creating the API server
var cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing
require("dotenv").config(); // Load environment variables from a .env file

const { default: mongoose } = require("mongoose"); // Mongoose for MongoDB connection
const path = require("path"); // Path module for working with file paths
const urlRoutes = require("./routes/urlRoutes"); // URL routes definition
const {
  redirectUrl,
} = require("./controllers/urlControllers/redirectUrlController");

// Define the port to listen on (fallback to 3000 if PORT is not set in environment variables)
const port = process.env.PORT || 3000;

// Create an instance of the Express application
const app = express();

// Connect to MongoDB using the MONGO_URL from environment variables
// TODO: Create a .env file in ./backend and add your own MONGO_URL
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected!"));

// Parse JSON request bodies
app.use(express.json());

// Middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse URL-encoded request bodies with extended mode
app.use(express.urlencoded({ extended: true }));

// Use the URL routes defined in urlRoutes for requests to "/api/v1/url"
app.use("/api/v1/url", urlRoutes);

// redirect URL
app.get("/url/:id", redirectUrl);

// Serve static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other routes by serving the "index.html" file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log("Listening on port " + port);
});
