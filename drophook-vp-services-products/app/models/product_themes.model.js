module.exports = (sequelize, Sequelize) => {
    const productThemes = sequelize.define("product_themes", {
      name: {
        type: Sequelize.STRING,
      }
    });
    return productThemes;
  };