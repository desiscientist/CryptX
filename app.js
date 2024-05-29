const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/User.js"); // Import the User model
const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/cryptx";

async function main() {
  await mongoose.connect(MONGO_URL);
}
const connectDB = require("./config/db");
// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("hello ji ! mein root bol raha hu.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
