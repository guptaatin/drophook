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

db.products = require("../models/product.model.js")(sequelize, Sequelize);
db.product_categories = require("../models/product_categories.model.js")(sequelize, Sequelize);
db.countries = require("../models/countries.model.js")(sequelize, Sequelize);
db.product_images = require("../models/product_images.model.js")(sequelize, Sequelize);
db.product_shipping = require("../models/product_shipping.model.js")(sequelize, Sequelize);
db.product_options = require("../models/product_options.model.js")(sequelize, Sequelize);
db.product_option_variant = require("../models/product_option_variant.model.js")(sequelize, Sequelize);
db.product_type = require("../models/product_type.model.js")(sequelize, Sequelize);
db.product_themes = require("../models/product_themes.model.js")(sequelize, Sequelize);

// product and product image
db.products.hasOne(db.product_images,{foreignKey:'product_id'});
db.product_images.belongsTo(db.products,{foreignKey:'product_id'}); 

// product and product_shipping
db.products.hasOne(db.product_shipping,{foreignKey:'product_id'});
db.product_shipping.belongsTo(db.products,{foreignKey:'product_id'});

// product and product_options
db.products.hasOne(db.product_options,{foreignKey:'product_id'});
db.product_options.belongsTo(db.products,{foreignKey:'product_id'});

// product and product_option_variant
db.products.hasOne(db.product_option_variant,{foreignKey:'product_id'});
db.product_option_variant.belongsTo(db.products,{foreignKey:'product_id'});

module.exports = db;