const express = require("express");

const driverModel = require("../models/driver");

const router = express.Router();

const controller = require('../controllers/driverController');

// Driver Routes

// add_driver POST endpoint
router.post("/add_driver", controller.addDriver);

// drivers GET endpoint
router.get("/drivers", controller.getAllDrivers);

// get_driver GET endpoint - Get bus using ID
router.get("/get_driver/:id", controller.getDriver);

// update_driver PUT endpoint - Update bus using ID
router.put("/update_driver/:id", controller.updateDriver)

// delete_driver DELETE endpoint - Delete single driver using ID
router.delete("/delete_driver/:id", controller.deleteDriver);


// Exporting endpoints
module.exports = router;