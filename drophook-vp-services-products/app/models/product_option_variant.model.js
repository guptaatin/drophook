module.exports = (sequelize, Sequelize) => {
  const productVariant= sequelize.define("product_option_variant", {
    product_id: {
      type: Sequelize.STRING
    },
    variant_name: {
      type: Sequelize.STRING
    },
    variant_type: {
      type: Sequelize.STRING
    },
    variant_weight: {
      type: Sequelize.STRING
    },
    product_identifier: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    wholesale_price: {
      type: Sequelize.STRING
    },
    suggested_wholesale: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.STRING
    },
    sku: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  });
  return productVariant;
};