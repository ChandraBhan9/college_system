require("dotenv").config({ debug: process.env.DEBUG });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const router = require("./src/router");
const db = require("./src/services/sequelize");
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// register route
router(app);

// set port, listen for requests
class Service {
  static async init() {
    let port = process.env.NODE_PORT || 2124;
    let host = process.env.NODE_HOST || "localhost";
    app.listen(port, host, function () {
      console.log(`Listening on ${host}:${port}`);
    });
  }
}

Service.init();
