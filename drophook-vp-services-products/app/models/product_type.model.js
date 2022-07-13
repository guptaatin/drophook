module.exports = (sequelize, Sequelize) => {
    const productType = sequelize.define("product_type", {
      name: {
        type: Sequelize.STRING,
      }
    });
    return productType;
  };