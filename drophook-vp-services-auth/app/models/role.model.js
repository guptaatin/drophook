module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    displayName : {
      type: Sequelize.STRING
    }
  });
  return Role;
};