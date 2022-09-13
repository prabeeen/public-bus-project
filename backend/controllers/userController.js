const userModel = require("../models/users");

module.exports = {

  getAllUsers: async (request, response) => {
    const users = await userModel.find({});

    try {
      response.send(users);
      return response.status(200, "Records found");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  addUsers: async (request, response) => {

    const userData = request.body

    const user = new userModel(userData);

    try {
      await user.save();
      response.send(user);
      return response.status(200, "User added");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  getUser: async (request, response) => {

    const id = request.params.id;

    const user = await userModel.findById(id);

    try {
      response.send(user);
      return response.status(200, "Record found");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  updateUser: async (request, response) => {

    const id = request.params.id;
    const updatedUser = request.body;
    const options = { new: true };

    const user = await userModel.findByIdAndUpdate(id, updatedUser, options);

    try {
      response.send(user);
      return response.status(200, "Record updated");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  deleteUser : async (request, response) => {

    const id = request.params.id;

    const user = await userModel.findByIdAndDelete(id);

    try {
      response.send(user);
      return response.status(200, "Record deleted");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  /* getUser: async (request, response) => {

    const id = request.params.id;

    const user = await userModel.findById(id);

    try {
      response.send(user);
      return response.status(200, "Record found");
    } catch (error) {
      response.status(500).send(error);
    }
  }, */

}