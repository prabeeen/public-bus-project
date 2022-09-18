const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const paymentSchema = mongoose.Schema({
  amount: {type: Number, required: true},
  mobile: {type: String, required: true},
  pidx: {type: String, required: true, unique: true},
  txnId: {type: String, required: true, unique: true},
  status: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

paymentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Payment', paymentSchema)
