module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define("vendor", {
    company_address: {
      type: Sequelize.STRING
    },
    city_name: {
      type: Sequelize.STRING
    },
    company_state: {
      type: Sequelize.STRING
    },
    company_zip: {
      type: Sequelize.STRING
    },
    business_profile: {
      type: Sequelize.STRING
    },
    facebook: {
      type: Sequelize.STRING
    },
    instagram: {
      type: Sequelize.STRING
    },
    twitter: {
      type: Sequelize.STRING
    },
    linkedin: {
      type: Sequelize.STRING
    },
    pinterest: {
      type: Sequelize.STRING
    },
    youtube: {
      type: Sequelize.STRING
    },
    vendor_id: {
      type: Sequelize.STRING
    }
  });
  return Vendor;
};