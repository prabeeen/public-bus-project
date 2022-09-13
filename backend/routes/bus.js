const express = require("express");

const busModel = require("../models/bus");

const router = express.Router();

const controller = require('../controllers/busController');

// Bus Routes

// add_bus POST endpoint - Add new bus
router.post("/add_bus", controller.addBus);

// get_buses GET endpoint - Get all buses
router.get("/get_buses", controller.getAllBuses);

// get_bus GET endpoint - Get bus using ID
router.get("/get_bus/:id", controller.getBus);

// update_bus PUT endpoint - Update bus using ID
router.put("/update_bus/:id", controller.updateBus)

// delete_bus DELETE endpoint - Delete single bus using ID
router.delete("/delete_bus/:id", controller.deleteBus);


module.exports = router;