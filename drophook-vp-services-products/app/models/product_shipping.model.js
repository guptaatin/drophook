module.exports = (sequelize, Sequelize) => {
  const productShipping = sequelize.define("product_shipping", {
    product_id: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    hs_code: {
      type: Sequelize.STRING
    },
    country_destination: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    address_types: {
      type: Sequelize.STRING
    },
    handling_time: {
      type: Sequelize.STRING
    },
    base_rate: {
      type: Sequelize.STRING
    },
    cart_min: {
      type: Sequelize.STRING
    },
    rate_additional_item: {
      type: Sequelize.STRING
    },
    estimated_delivery_days: {
      type: Sequelize.STRING
    },
    offer_expedited_shipping: {
      type: Sequelize.STRING
    },
    offer_rush_shipping: {
      type: Sequelize.STRING
    }
  });
  return productShipping;
};