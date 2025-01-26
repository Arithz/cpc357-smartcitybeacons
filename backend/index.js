const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = "mongodb://35.222.128.220:27017/smart-streetlight";
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const DataSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  motion_detected: { type: Number, required: true },
  is_raining: { type: Number, required: true },
  active_led: { type: Number, required: true },
});

const Data = mongoose.model("iot", DataSchema, "iot");

// Route to fetch data
app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Hardcoded credentials
const hardcodedCredentials = {
  email: "admin@example.com",
  password: "password123",
};
// Secret key for JWT
const JWT_SECRET = "your_secret_key";

// Login route
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Validate hardcoded credentials
  if (
    email === hardcodedCredentials.email &&
    password === hardcodedCredentials.password
  ) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// Token validation route
app.post("/auth/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ token: false });
    }

    res.json({ token: true });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
