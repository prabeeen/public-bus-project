const busModel = require('../models/bus')

module.exports = {

  addBus: async (request, response) => {

    const busData = request.body;

    const bus = new busModel(busData);

    try {
      await bus.save();
      response.send(bus);
      return response.status(200, "Bus added");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  getAllBuses: async (request, response) => {
    const buses = await busModel.find({});

    try {
      response.send(buses);
      return response.status(200, "Records found");

    } catch (error) {
      response.status(500).send(error);
    }
  },

  getBus: async (request, response) => {

    const id = request.params.id;

    const bus = await busModel.findById(id);

    try {
      response.send(bus);
      return response.status(200, "Record found");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  updateBus: async (request, response) => {

    const id = request.params.id;
    const updatedBus = request.body;
    const options = { new: true };

    const bus = await busModel.findByIdAndUpdate(id, updatedBus, options);

    try {
      response.send(bus);
      return response.status(200, "Record updated");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  deleteBus : async (request, response) => {

    const id = request.params.id;

    const bus = await busModel.findByIdAndDelete(id);

    try {
      response.send(bus);
      return response.status(200, "Record deleted");
    } catch (error) {
      response.status(500).send(error);
    }
  },

}