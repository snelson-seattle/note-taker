require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const connectDB = require("./config/dbConnection");

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

// Serve client assets
app.use(express.static("public"));

// Apply body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request routing
app.use(routes);

// Wait for database connection and then start listening for HTTP requests
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is listening for requests on port ${PORT}`);
  });
});

// Handle database connection errors
mongoose.connection.on("error", err => {
  console.error(err);
});
