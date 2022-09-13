const mongoose = require("mongoose");

// Bus Schema

const BusSchema = new mongoose.Schema({
    gps_location: {
      longitude:{
        type: Number,
      },
      latitude: {
        type: Number,
      }
    },
    assigned_driver_info: {
      type: String,
    },
    bus_number: {
      type: Number,
      required: true,
    },
    financial_info: {
        expenses: {
            type: Number,
        },

        revenue:{
            type: Number,
        }
    },
    id_no: {
        type: Number,
        required: true,
    },
    Yatayat: {
        type: String,
        required: true,
        default: false,
    },
});

const Bus = mongoose.model("Bus", BusSchema);

// Exporting schema

module.exports = Bus;