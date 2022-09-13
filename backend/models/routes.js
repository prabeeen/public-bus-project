const mongoose = require("mongoose");

// Routes Schema

const RoutesSchema = new mongoose.Schema({
    bus_route: {
        bus_stop: {
            stop_name: {
                type: String,
            },
            coordinates: {
                type: [Number],
            },
        },
        bus_license_plate_no: { //Bus ID
            type: String,
        },
        route_path: {
            type: [[Number]],
        }
    }
});

const Routes = mongoose.model("Routes", RoutesSchema);

// Exporting Models

module.exports = Routes;