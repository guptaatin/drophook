module.exports = (sequelize, Sequelize) => {
  const VendorRequest = sequelize.define("vendor_requests", {
    company_name: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    current_products: {
      type: Sequelize.STRING
    },
    ship_for_us: {
      type: Sequelize.STRING
    },
    avg_processing_time: {
      type: Sequelize.STRING
    },
    avg_shipping_time_us: {
      type: Sequelize.STRING
    },
    avg_shipping_time_in: {
      type: Sequelize.STRING
    },
    countries_offer: {
      type: Sequelize.STRING
    },
    niche: {
      type: Sequelize.STRING
    },
    company_website: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return VendorRequest;
};