const express = require("express");

//var paymentFunction = require("../payment/payment_web");

const router = express.Router();

const controller = require('../controllers/userController');

// User Routes

// add_user POST endpoint - Create User
router.post("/add_user", controller.addUsers);

// users GET endpoint - Get all users
router.get("/get_users", controller.getAllUsers);

// user/:id GET endpoint - Get single user
router.get("/user/:id", controller.getUser);

// update_user PUT endpoint - Update single user using ID
router.put("/update_user/:id", controller.updateUser);

// delete_user DELETE endpoint - Delete single user using ID
router.delete("/delete_user/:id", controller.deleteUser);

/* // search GET endpoint - Search user
router.get("/search", controller.search); */

/* router.post("/api/verify_payment", async (request, response) => {

    try {
      response.send(paymentFunction(request));
    } catch (error) {
      response.status(500).send(error);
    }

}); 
*/
  
module.exports = router;