module.exports = app => {
    const countries = require("../controllers/countries.controller.js");
    var router = require("express").Router();
    // Create a new countries
    router.post("/", countries.create);
    // Retrieve all countries
    router.get("/", countries.findAll);
    // Update a country with id
    router.get("/allCountries", countries.findAllCountries);
    app.use('/api/countries', router);
  };