const db = require("../models");
const Countries = db.countries;
const Op = db.Sequelize.Op;
// create and insert data into country table
exports.create = (req, res) => {
    // Validate request
    if (!req.body.country) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a country
    const country = {
      country: req.body.country,
      rank : req.body.rank
    };
    // Save country in the database
    Countries.create(country)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the country."
        });
      });
  };
  // get top 5 countries
  exports.findAll = (req, res) => {
    const rank = req.query.rank;
    var condition = rank ? { rank: { [Op.iLike]: `%${rank}%` } } : null;
    Countries.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving countries."
        });
      });
  };

  // get all countries 
  exports.findAllCountries = (req, res) => {
  Countries.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving roles."
      });
    });
};
  