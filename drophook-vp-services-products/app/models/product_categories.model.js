module.exports = (sequelize, Sequelize) => {
    const productCategory = sequelize.define("product_categories", {
      name: {
        type: Sequelize.STRING,
      }
    });
    return productCategory;
  };