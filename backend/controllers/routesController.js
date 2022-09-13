const routeModel = require('../models/routesController')

module.exports = {

  addRoute: async (request, response) => {

    const routeData = request.body;

    const route = new routeModel(busData);

    try {
      await route.save();
      response.send(route);
      return response.status(200, "Route added");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  getAllRoutes: async (request, response) => {
    const routes = await routeModel.find({});

    try {
      response.send(routes);
      return response.status(200, "Records found");

    } catch (error) {
      response.status(500).send(error);
    }
  },

  getBus: async (request, response) => {

    const id = request.params.id;

    const route = await routeModel.findById(id);

    try {
      response.send(route);
      return response.status(200, "Record found");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  updateBus: async (request, response) => {

    const id = request.params.id;
    const updatedRoute = request.body;
    const options = { new: true };

    const route = await routeModel.findByIdAndUpdate(id, updatedRoute, options);

    try {
      response.send(route);
      return response.status(200, "Record updated");
    } catch (error) {
      response.status(500).send(error);
    }
  },

  deleteRoute : async (request, response) => {

    const id = request.params.id;

    const route = await routeModel.findByIdAndDelete(id);

    try {
      response.send(route);
      return response.status(200, "Record deleted");
    } catch (error) {
      response.status(500).send(error);
    }
  },

}