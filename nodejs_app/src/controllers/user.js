const db = require("../services/sequelize");
const User = db.users;
const UserRole = db.user_role;
const Course = db.courses;

let roles = ["admin", "student"];
// User.hasMany(Course);

exports.create = async (req, res) => {
  try {
    var payload = req.body;
    // Validate request
    if (!roles.includes(payload.role)) {
      throw "Invalid role field";
    }
    for (let item of ["email", "phone", "name", "address", "enable"]) {
      if (!Object.keys(payload).includes(item)) {
        throw `Validation Failed! field not found: ${item}`;
      }
    }

    var userData = {
      email: payload.email,
      phone: payload.phone,
      name: payload.name,
      address: payload.address,
      enable: payload.enable,
      password: payload.email,
    };

    // Save User in the database
    let user = await User.create(userData);

    // create user role
    await UserRole.create({ userId: user.id, role: payload.role });

    res.send({ message: "Create successfully", data: user });
  } catch (err) {
    res.status(500).send({
      message: err.message || err || "Some error occurred",
    });
  }
};

// Update a User by the email in the request
exports.update = async (req, res) => {
  try {
    var payload = req.body;

    // Validate request
    for (let item of ["email", "phone", "name", "address", "enable"]) {
      if (!Object.keys(payload).includes(item)) {
        throw `Validation Failed! field not found: ${item}`;
      }
    }

    var userData = {
      phone: payload.phone,
      name: payload.name,
      address: payload.address,
      enable: payload.enable,
    };

    var filter = {
      email: payload.email,
    };

    // Save User in the database
    await User.update(userData, { where: filter });
    let user = await User.findOne({ where: filter });
    return res.send({ message: "Update successfully", data: user });
  } catch (err) {
    res.status(500).send({
      message: err.message || err || "Some error occurred",
    });
  }
};

/* 
  Retrieve filtred User from the database.
*/
exports.list = (req, res) => {
  var payload = req.body;

  // prepare filter
  var filter = {};
  payload.email ? (filter.email = payload.email) : null;
  payload.phone ? (filter.phone = payload.phone) : null;
  User.findAll({
    where: filter,
    include: [
      {
        model: Course,
        through: { attributes: [] },
      },
    ],
  })
    .then((data) => {
      res.send({ total: data.length, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
