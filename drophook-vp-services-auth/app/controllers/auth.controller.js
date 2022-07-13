const db = require("../models");
const config = require("../config/auth.config");
require('dotenv').config();
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail')

const API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(API_KEY)

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_no: req.body.phone_no,
    email: req.body.email,
    vendor_id : req.body.vendor_id,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.update({
           code: roles[0].dataValues.code,
           where : { id : user.id }
          })
          res.status(200).send({ 
            id: user.id,
            email: user.email,
            first_name : user.first_name,
            last_name : user.last_name,
            phone_no : user.phone_no,
            vendor_id : user.vendor_id,
            logged_in : user.logged_in,
            code : user.code,
            profile_image : user.profile_image,
            message : "User was registered successfully"
          });
        });
      } 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User with email not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      const code = user.code;
      var condition = code ? { code: { [Op.iLike]: `%${code}%` } } : null;
      Role.findAll({where : condition })
      .then(data => {
      res.status(200).send({
          id: user.id,
          first_name : user.first_name,
          last_name : user.last_name,
          phone_no : user.phone_no,
          vendor_id : user.vendor_id,
          email: user.email,
          roles : "ROLE_"+data[0].dataValues.name.toUpperCase(),
          accessToken: token,
          logged_in : user.logged_in,
          profile_image : user.profile_image
      })
    })
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};