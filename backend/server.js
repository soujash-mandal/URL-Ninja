const express = require("express");
var cors = require("cors");
require("dotenv").config();
const clerkMiddleware = require("./middlewares/clerkMiddleware");
const { default: mongoose } = require("mongoose");


const port = process.env.PORT || 8080;
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


app.listen(port, () => {
  console.log("listening on port " + port);
});
