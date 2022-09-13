const driverModel = require('../models/driver')

module.exports = {

  addDriver: async (request, response) => {

    driverData = request.body;

    const driver = new driverModel(driverData);

    try {
      await driver.save();
      response.send(driver);
      return response.status(200, "Driver added");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  getAllDrivers: async (request, response) => {

    const drivers = await driverModel.find({});

    try {
      response.send(drivers);
      return response.status(200, "Records found");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  getDriver: async (request, response) => {

    const id = request.params.id;

    const driver = await driverModel.findById(id);

    try {
      response.send(driver);
      return response.status(200, "Record found");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  updateDriver: async (request, response) => {

    const id = request.params.id;
    const updatedDriver = request.body;
    const options = { new: true };

    const driver = await driverModel.findByIdAndUpdate(id, updatedDriver, options);

    try {
      response.send(driver);
      return response.status(200, "Record updated");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  deleteDriver : async (request, response) => {

    const id = request.params.id;

    const driver = await driverModel.findByIdAndDelete(id);

    try {
      response.send(driver);
      return response.status(200, "Record deleted");
    } catch (error) {
      response.status(500).send(error);
    }
  },


}