const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const driverSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

driverSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Driver", driverSchema)
