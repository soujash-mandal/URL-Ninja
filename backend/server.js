const express = require("express");
var cors = require("cors");
require("dotenv").config();
const clerkMiddleware = require("./middlewares/clerkMiddleware");
const { default: mongoose } = require("mongoose");
const path = require("path");


const port = process.env.PORT || 3000;
const app = express();

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB Connected!"));

app.use(express.json());

// middleware for CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));



// Apply the middleware to all API endpoints
app.use("/api/v1", clerkMiddleware);

// Define your API endpoints
app.get("/api/v1/all-urls", (req, res) => {
  console.log(req.email);
  res.status(200).json(req.email);
});
app.post("/api/v1/url", (req, res) => {
  console.log(req.body.url);
  res.status(200).json(req.body);
});



// Serve static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other routes by serving the "index.html" file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
