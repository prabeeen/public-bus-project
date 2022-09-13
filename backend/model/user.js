const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: Number, required: true},
  idType: {type: String},
  idImagePath: {type: String},
  idNo: {type: String}

})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema)
