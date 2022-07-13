const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to authentication application." });
});
// set port, listen for requests
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});