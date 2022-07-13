module.exports = (sequelize, Sequelize) => {
  const productData = sequelize.define("products", {
    vendor_id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    sku: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    map_pricing: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    multiple_variant: {
      type: Sequelize.STRING
    },
    product_identifier: {
      type: Sequelize.STRING
    },
    category_name: {
      type: Sequelize.STRING
    },
    product_theme: {
      type: Sequelize.STRING
    },
    product_internal_tags: {
      type: Sequelize.STRING
    },
    product_type : {
      type: Sequelize.STRING
    },
    video_type : {
      type: Sequelize.STRING
    },
    video_url : {
      type: Sequelize.STRING
    }
  });
  return productData;
};