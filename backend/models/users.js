const mongoose = require("mongoose");

// User Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    default: 0,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  id_type: {    // 0 - No ID, 1 - Student, 2 - Senior Citizen, 3 Differently-abled
    type: Number,
    required: true,
  },
  id_card: {
    type: Boolean,
    required: true,
    default: false,
  },
  id_verification_status: {
    type: Boolean,
    required: true,
    default: false,
  },
  id_info: {
    type: Number,
  }
});

const User = mongoose.model("User", UserSchema);
  
// Exporting Models

module.exports = User;
