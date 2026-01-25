const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // serve CSS/JS

// Connect to MongoDB (replace DB name if you want)
mongoose.connect("mongodb://127.0.0.1:27017/shootingStarDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Handle form submission
app.post("/register", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const user = new User(req.body);
    await user.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
