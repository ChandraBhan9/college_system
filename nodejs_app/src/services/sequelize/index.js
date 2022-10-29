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
db.user_role = require("../../models/user_role.js")(sequelize, Sequelize);
db.courses = require("../../models/course.js")(sequelize, Sequelize);
db.user_course = require("../../models/user_course.js")(sequelize, Sequelize);

// register relation
// user - course relation through user_course
db.users.belongsToMany(db.courses, { through: db.user_course });

// db.user_course.belongsTo(db.courses);
// db.courses.hasMany(db.users, { through: db.user_course });

sequelize.sync({ alter: true });
module.exports = db;
