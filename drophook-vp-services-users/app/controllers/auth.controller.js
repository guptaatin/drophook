const db = require("../models");
require('dotenv').config();
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail')

const API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(API_KEY)

exports.validateEmail = (req,res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User with email not found." });
  } else {

        
        var token = jwt.sign({ id: user.id }, config.secret, {
           expiresIn: 86400 // 24 hours
        });
        var user_id = user.id
        const code = user.code;
        var condition = code ? { code: { [Op.iLike]: `%${code}%` } } : null;
        const message = {
          to : req.body.email,
          from : process.env.SENDGRID_FROM_EMAIL,
          subject : '[Drophook] Please reset your password',
          text : 'Reset your drophook password',
          html : `<div style=" max-width: 700px;margin:auto;text-align: center;" >
          <svg
        xmlns="http://www.w3.org/2000/svg"
        width="122.613"
        height="23"
        viewBox="0 0 122.613 23"
        className="SignIn__Brand-sc-1op03ps-0 gDkzTA"
      >
        <g
          id="Group_1227"
          data-name="Group 1227"
          transform="translate(642.38 1381.609)"
        >
          <g
            id="Group_14"
            data-name="Group 14"
            transform="translate(-579.843 -1381.609)"
          >
            <path
              id="Path_39"
              data-name="Path 39"
              d="M-47.958-1378.616h-3.964a.338.338,0,0,0-.358.358v8.07a.19.19,0,0,1-.215.214h-3.392a.19.19,0,0,1-.215-.214v-8.07a.338.338,0,0,0-.358-.358h-3.964a.338.338,0,0,0-.358.358v21.3a.338.338,0,0,0,.358.357h3.964a.338.338,0,0,0,.358-.357v-8.589a.19.19,0,0,1,.215-.214h3.392a.19.19,0,0,1,.215.214v8.589a.338.338,0,0,0,.358.357h3.964a.338.338,0,0,0,.358-.357v-21.3A.338.338,0,0,0-47.958-1378.616Z"
              transform="translate(60.779 1378.938)"
              fill="#B1B1B1"
            ></path>
            <path
              id="Path_40"
              data-name="Path 40"
              d="M377.39-1356.957l-5.464-11.874,4.856-9.428a.221.221,0,0,0-.179-.358H372.46a.459.459,0,0,0-.463.286l-4.429,9.392v-9.321a.338.338,0,0,0-.358-.358h-3.964a.336.336,0,0,0-.356.358v21.3a.336.336,0,0,0,.356.357h3.964a.338.338,0,0,0,.358-.357v-4.3l1.429-3,3.571,7.411c.036.179.143.25.358.25h4.25A.246.246,0,0,0,377.39-1356.957Z"
              transform="translate(-317.336 1378.938)"
              fill="#B1B1B1"
            ></path>
            <path
              id="Path_41"
              data-name="Path 41"
              d="M232.489-1377.5c-.892-2.678-3.036-4.107-6.215-4.107s-5.321,1.429-6.213,4.107c-.372,1.047-.488,2-.5,7.393.011,5.392.125,6.346.5,7.393.892,2.678,3.036,4.107,6.215,4.107s5.321-1.429,6.213-4.107c.372-1.047.488-2,.5-7.393C232.975-1375.5,232.861-1376.455,232.489-1377.5Zm-4.253,7.393c-.007,5-.08,5.568-.249,6.107a1.7,1.7,0,0,1-1.713,1.178A1.7,1.7,0,0,1,224.56-1364c-.169-.54-.242-1.108-.249-6.107h0c.007-5,.08-5.568.249-6.108a1.7,1.7,0,0,1,1.713-1.178,1.7,1.7,0,0,1,1.715,1.178c.169.54.242,1.108.249,6.108Z"
              transform="translate(-189.418 1381.609)"
              fill="#B1B1B1"
            ></path>
            <path
              id="Path_42"
              data-name="Path 42"
              d="M90.778-1377.5c-.892-2.678-3.036-4.107-6.215-4.107s-5.321,1.429-6.213,4.107c-.372,1.047-.488,2-.5,7.393.011,5.392.125,6.346.5,7.393.892,2.678,3.036,4.107,6.215,4.107s5.321-1.429,6.213-4.107c.372-1.047.488-2,.5-7.393C91.264-1375.5,91.15-1376.455,90.778-1377.5Zm-4.253,7.393c-.006,5-.08,5.568-.249,6.107a1.7,1.7,0,0,1-1.713,1.178A1.7,1.7,0,0,1,82.849-1364c-.169-.54-.242-1.108-.249-6.107h0c.007-5,.08-5.568.249-6.108a1.7,1.7,0,0,1,1.713-1.178,1.7,1.7,0,0,1,1.715,1.178c.169.54.242,1.108.249,6.108Z"
              transform="translate(-62.945 1381.609)"
              fill="#B1B1B1"
            ></path>
          </g>
          <path
            id="Path_43"
            data-name="Path 43"
            d="M-629.666-1376.992c-.892-2.749-2.857-4.035-6.214-4.035h-6.143a.338.338,0,0,0-.357.358v21.3a.338.338,0,0,0,.357.358h6.143c3.357,0,5.321-1.286,6.214-4.035.4-1.252.608-2.746.638-6.973C-629.059-1374.245-629.271-1375.74-629.666-1376.992Zm-4.5,12.266a1.981,1.981,0,0,1-2.178,1.5h-1.142a.19.19,0,0,1-.215-.214V-1376.6a.19.19,0,0,1,.215-.214h1.142a1.982,1.982,0,0,1,2.178,1.5c.261.683.372,1.605.389,5.293C-633.794-1366.331-633.9-1365.408-634.166-1364.725Z"
            transform="translate(0 -0.331)"
            fill="#FCFCFC"
          ></path>
          <g
            id="Group_15"
            data-name="Group 15"
            transform="translate(-626.735 -1381.609)"
          >
            <path
              id="Path_44"
              data-name="Path 44"
              d="M-483.026-1356.957l-3.322-8.017c1.679-1.143,2.714-3.143,2.714-6.213,0-5.392-2.786-7.429-7.105-7.429h-5.786a.338.338,0,0,0-.358.358v21.3a.338.338,0,0,0,.358.357h3.964a.338.338,0,0,0,.357-.357v-6.66a.19.19,0,0,1,.215-.215h1.357l2.748,6.946a.354.354,0,0,0,.393.286h4.286C-483.026-1356.6-482.955-1356.778-483.026-1356.957Zm-7.928-10.91h-1.035a.19.19,0,0,1-.215-.215v-6.213a.19.19,0,0,1,.215-.215h1.035c1.82,0,2.607.785,2.607,3.322C-488.347-1368.616-489.134-1367.867-490.954-1367.867Z"
              transform="translate(496.883 1378.938)"
              fill="#FCFCFC"
            ></path>
            <path
              id="Path_45"
              data-name="Path 45"
              d="M-341.648-1377.5c-.892-2.678-3.036-4.107-6.215-4.107s-5.321,1.429-6.213,4.107c-.372,1.047-.488,2-.5,7.393.011,5.392.125,6.346.5,7.393.892,2.678,3.036,4.107,6.215,4.107s5.321-1.429,6.213-4.107c.372-1.047.488-2,.5-7.393C-341.162-1375.5-341.276-1376.455-341.648-1377.5Zm-4.253,7.393c-.006,5-.08,5.568-.249,6.107a1.7,1.7,0,0,1-1.713,1.178,1.7,1.7,0,0,1-1.715-1.178c-.169-.54-.242-1.108-.249-6.107h0c.006-5,.08-5.568.249-6.108a1.7,1.7,0,0,1,1.713-1.178,1.7,1.7,0,0,1,1.715,1.178c.169.54.242,1.108.249,6.108Z"
              transform="translate(369.877 1381.609)"
              fill="#FCFCFC"
            ></path>
            <path
              id="Path_46"
              data-name="Path 46"
              d="M-198.721-1378.616h-5.714a.338.338,0,0,0-.358.358v21.3a.338.338,0,0,0,.358.357h3.964a.338.338,0,0,0,.358-.357v-6.161a.189.189,0,0,1,.215-.213h1.178c4.321,0,7.141-2.144,7.141-7.643C-191.58-1376.51-194.292-1378.616-198.721-1378.616Zm-.143,11.178H-199.9a.19.19,0,0,1-.215-.214v-6.642a.19.19,0,0,1,.215-.215h1.035c1.822,0,2.607.785,2.607,3.535S-197.042-1367.438-198.864-1367.438Z"
              transform="translate(236.2 1378.938)"
              fill="#FCFCFC"
            ></path>
          </g>
        </g>
      </svg>
      <h1
        style="
          font-size: 22px;
          color: #4D4D4D;
          font-weight: 400;
          font-family: Roboto;
          text-align: center;
        "
      >
        Reset your Drophook password
      </h1>
      <div
        style="
          box-shadow: 0px 2px 16px -6px rgba(0,0,0,0.75);
          padding: 30px;
          border-radius: 4px;
          text-align: left;
        "
      >
        <h2
          style="
            font-family: Circular Std Book;
            font-size: 16px;
            color: #464A53;
            margin-top: 0;
          "
        >
          Drophook password reset
        </h2>
        <p
          style="
            font-family:Roboto;
            font-size: 14px;
            color: #464A53;
            margin-top: 0;
          "
        >
          We heard that you lost your Drophook password. Sorry about that!!
        </p>
        <p
          style="
            font-family: Roboto;
            font-size: 14px;
            color: #464A53;
            margin-top: 0;
          ">
          But don't worry! you can use the following link to reset your
          password:
        </p>
        <p
          style="
            font-family: Roboto;
            font-size: 14px;
            color: #464A53;
            margin-top: 0;
          "
        >
          if you don't use this link within 24 hours, it will expire
        </p>
        <a
          href="${process.env.CREATE_PASSWORD_LINK}${user_id}@${token}"
          style="
            color: rgba(255, 255, 255, 1);
            text-decoration: none;
            background: #4BB453;
            padding: 8px 15px;
            margin: auto;
            display: block;
            max-width: 175px;
            text-align: center;
            border-radius: 4px;
          "
        >
          <span
            style="color: rgba(255, 255, 255, 1);">
            Reset your password
          </span>
        </a>
        <p style="
            font-family: Roboto;
            font-size: 14px;
            color: #464A53;">
          Thanks, The Drophook Team
        </p>
      </div>
    </div>`
        }
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
         sgMail.send(message)
         .then(email_data => console.log('Email has been sent'))
         .catch(error => console.log(error.message))
       })
    }
  })
}

// reset password
  exports.update = (req, res) => {
    const id = req.params.id;
  User.findOne({ where: { id: id } })
  .then(user_update => {
     if (user_update) {
      user_update.update({
        password: bcrypt.hashSync(req.body.password, 8)
      })
      res.status(202).send({ message: "User updated successfully." });
    }
  })
  .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the user."
        });
      });
  };

  // get all roles 
  exports.findAllRoles = (req, res) => {
  Role.findAll({
    where: {
      [Op.or]: [{id: 2}, {id: 3},{id: 4},{id:5 }]
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving roles."
      });
    });
};

// get roles for vendor 

 exports.findVendorRoles = (req, res) => {
  Role.findAll({
    where: {
      [Op.or]: [{id: 2}, {id: 4}]
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving roles."
      });
    });
};


// get all users 
exports.findAllUsers = (req, res) => {
  User.findAll({
    where: {
    code: {
      [Op.not]: '1002'
    }
  }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// get all users vendor wise 
exports.findVendorUsers = (req, res) => {
  const id = req.params.id;
  User.findAll({
    where: { vendor_id : id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// get all users vendor wise 
exports.findSingleUser = (req, res) => {
  const id = req.params.id;
  User.findAll({
    where: { id : id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// delete user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};


// update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};