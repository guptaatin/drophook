const db = require("../models");
const Vendor = db.vendors;
const Op = db.Sequelize.Op;
// create and insert data into vendor table
exports.create = (req, res) => {
    // Validate request
    if (!req.body.company_address) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a vendor
    const vendor = {
      company_address: req.body.company_address,
      city_name: req.body.city_name,
      company_state: req.body.company_state,
      company_zip: req.body.company_zip,
      business_profile: req.body.business_profile,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      pinterest: req.body.pinterest,
      youtube: req.body.youtube,
      vendor_id: req.body.vendor_id
    };
    // Save vendor in the database
    Vendor.create(vendor)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the vendor."
        });
      });
  };
  // get all vendors
  exports.findAll = (req, res) => {
    const status = req.query.status;
    var condition = status ? { status: { [Op.iLike]: `%${status}%` } } : null;
    Vendor.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vendors."
        });
      });
  };
  // update vendor
  exports.update = (req, res) => {
    const vendor_id = req.params.vendor_id;
    console.log(vendor_id);
    Vendor.update(req.body, {
      where: { vendor_id: vendor_id }
    })
      .then(num => {
        console.log(num);
        if (num > 0) {
          res.send({
            message: "vendor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update vendor with vendor_id=${vendor_id}. Maybe vendor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating vendor with id=" + vendor_id
        });
      });
  };