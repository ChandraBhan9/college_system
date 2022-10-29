const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.SK_MYSQLDB_DB_NAME,
  process.env.SK_MYSQLDB_USERNAME,
  process.env.SK_MYSQLDB_PASSWORD,
  {
    host: process.env.SK_MYSQLDB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: false,
    pool: {
      max: 500,
      min: 0,
      idle: 10000,
      acquire: 100 * 1000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// register models
db.users = require("../../models/user.js")(sequelize, Sequelize);

sequelize.sync({ alter: true });
module.exports = db;
