module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
      user_id : {
       type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.STRING,
      },
    });
    return Image;
  };