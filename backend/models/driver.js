const mongoose = require("mongoose");

// Driver Schema

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  driving_license_number: {
    type: Number,
    required: true,
  },
  yatayat: {
    type: String,
    required: true,
  },
});

const Driver = mongoose.model("Driver", DriverSchema);
  
// Exporting Models

module.exports = Driver;
