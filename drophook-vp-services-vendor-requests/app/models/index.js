const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.vendor_requests = require("./vendor_request.model.js")(sequelize, Sequelize);
db.vendors = require("./vendor.model.js")(sequelize, Sequelize);

// vendor and vendor request
db.vendor_requests.hasOne(db.vendors,{foreignKey:'vendor_id'});
db.vendors.belongsTo(db.vendor_requests,{foreignKey:'vendor_id'});
module.exports = db;