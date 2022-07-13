const db = require("../models");
const productData = db.products;
const productImage = db.product_images;
const productShipping = db.product_shipping;
const productOptions = db.product_options;
const productVariant = db.product_option_variant;
const productCategory = db.product_categories;
const productType = db.product_type;
const productTheme = db.product_themes;
const Op = db.Sequelize.Op;

// create and insert data into product table
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create product
    const product = {
      vendor_id: req.body.vendor_id,
      name: req.body.name,
      sku: req.body.sku,
      description: req.body.description,
      map_pricing: req.body.map_pricing,
      price: req.body.price,
      multiple_variant: req.body.multiple_variant,
      product_identifier: req.body.product_identifier,
      category_name: req.body.category_name,
      product_theme: req.body.product_theme,
      product_internal_tags : req.body.product_internal_tags,
      product_type : req.body.product_type,
      video_type : req.body.video_type,
      video_url : req.body.video_url
    };

    // Save vendor in the database
    productData.create(product)
      .then(data => {

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
};

// insert data into product shipping table
exports.insertProductShipping = (req, res) => {
    // Validate request
    if (!req.body.weight) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create product
    const product_shipping = {
      product_id: req.body.product_id,
      weight: req.body.weight,
      country: req.body.country,
      hs_code: req.body.hs_code,
      country_destination: req.body.country_destination,
      state: req.body.state,
      address_types: req.body.address_types,
      handling_time: req.body.handling_time,
      base_rate: req.body.base_rate,
      cart_min: req.body.cart_min,
      rate_additional_item: req.body.rate_additional_item,
      estimated_delivery_days: req.body.estimated_delivery_days,
      offer_expedited_shipping: req.body.offer_expedited_shipping,
      offer_rush_shipping: req.body.offer_rush_shipping
    };
   // Save product shipping in the database
    productShipping.create(product_shipping)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
};

// insert data into product shipping table
exports.insertProductShipping = (req, res) => {
    // Validate request
    if (!req.body.weight) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create product
    const product_shipping = {
      product_id: req.body.product_id,
      weight: req.body.weight,
      country: req.body.country,
      hs_code: req.body.hs_code,
      country_destination: req.body.country_destination,
      state: req.body.state,
      address_types: req.body.address_types,
      handling_time: req.body.handling_time,
      base_rate: req.body.base_rate,
      cart_min: req.body.cart_min,
      rate_additional_item: req.body.rate_additional_item,
      estimated_delivery_days: req.body.estimated_delivery_days,
      offer_expedited_shipping: req.body.offer_expedited_shipping,
      offer_rush_shipping: req.body.offer_rush_shipping
    };
   // Save product shipping in the database
    productShipping.create(product_shipping)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
};

// insert data into product shipping table
exports.insertProductOptions = (req, res) => {
    // Validate request
    if (!req.body.product_option1) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create product
    const product_options = {
      product_id: req.body.product_id,
      what_gender_is_product_for: req.body.what_gender_is_product_for,
      condition: req.body.condition,
      product_option1: req.body.product_option1,
      product_option2: req.body.product_option2,
      product_option3: req.body.product_option3
    };
   // Save product shipping in the database
    productOptions.create(product_options)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
};

// insert data into product shipping table
exports.insertProductOptionVariant = (req, res) => {
    // Validate request
    if (!req.body.product_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create product
    const product_variant = {
      product_id: req.body.product_id,
      size: req.body.size,
      variant_name: req.body.variant_name,
      variant_type: req.body.variant_type,
      variant_weight : req.body.variant_weight,
      product_identifier : req.body.product_identifier,
      price: req.body.price,
      wholesale_price: req.body.wholesale_price,
      suggested_wholesale: req.body.suggested_wholesale,
      quantity: req.body.quantity,
      sku : req.body.sku,
      image : req.body.image
    };
   // Save product shipping in the database
    productVariant.create(product_variant)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
};


// get all product vendor_wise
exports.findAllProducts = (req, res) => {
  const vendor_id = req.query.vendor_id;
  var condition = vendor_id ? { vendor_id: { [Op.iLike]: `%${vendor_id}%` } } : null;
  productData.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};


// get all product vendor_wise
exports.getAllProducts = (req, res) => {
  productData.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

exports.joinProductImage = (req, res) => {
    const id = req.params.id;
    productData.findAll({
      include : [{
        model : productImage,
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

// get product shipping info
  exports.joinProductShipping = (req, res) => {
    const id = req.params.id;
    productData.findAll({
      include : [{
        model : productShipping,
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

  // get product options info
   exports.joinProductOptions = (req, res) => {
    const id = req.params.id;
    productData.findAll({
      include : [{
        model : productOptions,
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


  // get product variant info
   exports.joinProductVariants = (req, res) => {
    const id = req.params.id;
    productData.findAll({
      include : [{
        model : productVariant,
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


  // product update
  exports.update = (req, res) => {
    const id = req.params.id;
    productData.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "product was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating update with id=" + id
        });
      });
  };

  // insert data into product categories table
exports.insertProductCategory = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const product_category = {
      name: req.body.name
    };
    productCategory.create(product_category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product category."
        });
      });
};

// get all product categories
exports.getAllProductCategories = (req, res) => {
  productCategory.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product categories."
      });
    });
};

  // insert data into product type table
  exports.insertProductType = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const product_type = {
      name: req.body.name
    };
    productType.create(product_type)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product type."
        });
      });
};

// get all product type
exports.getAllProductType = (req, res) => {
  productType.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product type."
      });
    });
};


// insert data into product theme table
exports.insertProductTheme = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create product
  const product_theme = {
    name: req.body.name
  };
  productTheme.create(product_theme)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product theme."
      });
    });
};

// get all product themes
exports.getAllProductThemes = (req, res) => {
productTheme.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving product theme."
    });
  });
};