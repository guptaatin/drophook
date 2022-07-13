const db = require("../models");
const VendorRequest = db.vendor_requests;
const Vendor = db.vendors;
const Op = db.Sequelize.Op;

// create and insert data into vendor request table

exports.create = (req, res) => {
    // Validate request
    if (!req.body.company_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a vendor
    const vendor_requests = {
      company_name : req.body.company_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      current_products: req.body.current_products,
      ship_for_us: req.body.ship_for_us,
      avg_processing_time: req.body.avg_processing_time,
      avg_shipping_time_us: req.body.avg_shipping_time_us,
      avg_shipping_time_in: req.body.avg_shipping_time_in,
      countries_offer: req.body.countries_offer,
      niche: req.body.niche,
      company_website: req.body.company_website,
      role: req.body.role,
      status: 'pending'
    };
    // Save vendor requests in the database
    VendorRequest.create(vendor_requests)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the vendor request."
        });
      });
  };

  // get all vendor requests
  exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    VendorRequest.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vendor request."
        });
      });
  };

  exports.findAllVendor = (req, res) => {
  VendorRequest.findAll({ where: { status: 'pending' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendor request."
      });
    });
};
 exports.findAllVendorApproved = (req, res) => {
  VendorRequest.findAll({ where: { status: 'approved' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendor request."
      });
    });
};
  // get single object 
  exports.findOne = (req, res) => {
  const id = req.params.id;
  VendorRequest.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find vendor request with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving vendor request with id=" + id
      });
    });
};

  // update vendor
  exports.update = (req, res) => {
    const id = req.params.id;
    VendorRequest.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "vendor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update vendor with id=${id}. Maybe vendor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating vendor with id=" + id
        });
      });
  };

  // delete all vendor after approval
  exports.delete = (req, res) => {
    const id = req.params.id;
    VendorRequest.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "vendor request was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete vendor request with id=${id}. Maybe vendor request was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

  exports.oneToOne = (req, res) => {
    const id = req.params.id;
    VendorRequest.findAll({
      include : [{
        model : Vendor,
        required : true
      }],
      where : {id : id}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendor request."
      });
    });
  };

  // display all vendor ids
  exports.findVendorIds = (req, res) => {
  VendorRequest.findAll({
    where: { status : 'approved' }
  })
   .then(data => {
    var vendor_ids = [];
    for(let i = 0 ; i < data.length; i++ )
    {
      vendor_ids.push({
        id : data[i].id,
        company_name : data[i].company_name
      });
    }
      res.status(200).send({
          vendor_data: vendor_ids
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendor ids."
      });
    });
  };