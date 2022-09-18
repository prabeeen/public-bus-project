const express = require("express");
const router = express.Router();

const PaymentController = require("../controller/payment")
const checkAuth = require("../middleware/check-auth")


// initiate payment POST endpoint
router.post("/initiate_payment", checkAuth, PaymentController.initiatePayment);

//  lookup payment POST endpoint
router.post("/lookup_payment", checkAuth, PaymentController.lookupPayment);

router.get("/get-payment", checkAuth, PaymentController.getPayment);

router.get("/payment-info-admin", checkAuth, PaymentController.paymentInfoAdmin);

router.post("/payment-verify-driver", checkAuth, PaymentController.paymentVerifyDriver);

module.exports = router
