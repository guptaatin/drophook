module.exports = (sequelize, Sequelize) => {
  const productImage = sequelize.define("product_images", {
    product_id: {
      type: Sequelize.STRING
    },
    image_type: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.STRING
    }
  });
  return productImage;
};