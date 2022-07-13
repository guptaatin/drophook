module.exports = (sequelize, Sequelize) => {
  const productOption= sequelize.define("product_options", {
    product_id: {
      type: Sequelize.STRING
    },
    what_gender_is_product_for: {
      type: Sequelize.STRING
    },
    condition: {
      type: Sequelize.STRING
    },
    product_option1: {
      type: Sequelize.STRING
    },
    product_option2: {
      type: Sequelize.STRING
    },
    product_option3: {
      type: Sequelize.STRING
    }
  });
  return productOption;
};