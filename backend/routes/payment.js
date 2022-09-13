const express = require("express");

const controller = require('../controllers/paymentController');

const router = express.Router();

// Payment Routes

// initiate payment POST endpoint
router.post("/initiate_payment", controller.initiatePayment);

//  lookup payment POST endpoint
router.get("/lookup_payment", controller.lookupPayment);

module.exports = router;
