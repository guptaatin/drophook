module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    code : {
      type: Sequelize.STRING
    },
    first_name : {
      type: Sequelize.STRING
    },
    last_name : {
      type: Sequelize.STRING
    },
    phone_no : {
     type: Sequelize.STRING
    },
    vendor_id : {
      type: Sequelize.STRING
    },
    logged_in : {
      type: Sequelize.STRING
    },
    profile_image :{
      type: Sequelize.STRING
    }
  });
  return User;
};