const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const adminSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  contact: {type: String, required: true}
})

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admin", adminSchema)
