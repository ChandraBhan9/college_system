const sequelize = require("sequelize");
const user = require("../models/user");
const db = require("../services/sequelize");
const Course = db.courses;
const UserCourse = db.user_course;

exports.create = async (req, res) => {
  try {
    var payload = req.body;
    // Validate request
    for (let item of ["name", "uuid", "maxSeat"]) {
      if (!Object.keys(payload).includes(item)) {
        throw `Validation Failed! field not found: ${item}`;
      }
    }

    var courseData = {
      uuid: payload.uuid,
      name: payload.name,
      noOfSeatsAvailable: payload.maxSeat,
    };

    // Save Course in the database
    let course = await Course.create(courseData);
    return res.send({ message: "Create successfully", data: course });
  } catch (err) {
    res.status(500).send({
      message: err.message || err || "Some error occurred",
    });
  }
};

// Update a Course by the uuid in the request
exports.update = async (req, res) => {
  try {
    var payload = req.body;

    // Validate request
    for (let item of ["name", "uuid", "maxSeat"]) {
      if (!Object.keys(payload).includes(item)) {
        throw `Validation Failed! field not found: ${item}`;
      }
    }

    var courseData = {
      name: payload.name,
      noOfSeatsAvailable: payload.maxSeat,
    };

    var filter = {
      uuid: payload.uuid,
    };

    // Save Course in the database
    await Course.update(courseData, { where: filter });
    let result = await Course.findOne({ where: filter });
    res.send({ message: "Update successfully", data: result });
  } catch (err) {
    res.status(500).send({
      message: err.message || err || "Some error occurred",
    });
  }
};

/* 
  Retrieve filtred Course from the database.
*/
exports.list = (req, res) => {
  var payload = req.body;
  // prepare filter
  var filter = {};
  payload.name ? (filter.name = payload.name) : null;

  Course.findAll({ where: filter })
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

// Enroll user in course
exports.enroll = async (req, res) => {
  try {
    var payload = req.body;

    // Validate request
    for (let item of ["course_uuid"]) {
      if (!Object.keys(payload).includes(item)) {
        throw `Validation Failed! field not found: ${item}`;
      }
    }

    let user_id =
      req.session_data && req.session_data.user_id
        ? req.session_data.user_id
        : req.session_data.user_id;

    // validate course
    let course = await Course.findOne({ where: { uuid: payload.course_uuid } });
    if (!course) {
      throw "Invalid course id";
    }

    // check if seats available
    let totalEnrolled = await UserCourse.findAndCountAll({
      where: { courseId: course.id },
    });
    if (totalEnrolled && totalEnrolled.count >= course.noOfSeatsAvailable) {
      throw "All seats are filled, please enroll in other courses";
    }

    // check if already enrolled
    let userCourse = await UserCourse.findOne({
      where: { courseId: course.id, userId: user_id },
    });
    if (userCourse && userCourse.id) {
      throw "User already Enrolled";
    }

    // Save Enrolled Course in the database
    let data = await UserCourse.create({
      userId: 2,
      courseId: course.id,
    });

    res.send({ message: "Enroll successfully", data: data });
  } catch (err) {
    res.status(500).send({
      message: err.message || err || "Some error occurred",
    });
  }
};
