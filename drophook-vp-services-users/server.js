const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()
app.use((req, res, next) => {  res.header('Access-Control-Allow-Origin', '*');  next();});
const db = require("./app/models");

var corsOptions = {
    origin: "*"
  };

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const initRoutes = require("./app/routes/web");
global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to authentication application." });
});
// set port, listen for requests
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});