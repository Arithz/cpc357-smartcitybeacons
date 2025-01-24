const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
