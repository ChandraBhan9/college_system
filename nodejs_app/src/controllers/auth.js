const db = require("../services/sequelize");
const User = db.users;
const JWTHelper = require("../helper/jwt");
exports.login = async (req, res) => {
  try {
    var payload = req.body;
    // Validate request
    for (let item of ["email", "password"]) {
      if (!Object.keys(payload).includes(item)) {
        throw `Validation Failed! field not found: ${item}`;
      }
    }

    // Save User in the database
    let user = await User.findOne({ where: { email: payload.email } });

    if (user) {
      if (user.password === payload.password) {
        let tokenData = {
          user_email: user.email,
          user_id: user.id,
        };
        // prepare jwt token
        token = await new JWTHelper().bcrypt(tokenData);
        return res.send({ message: "Login successfully", token: token });
      }
      throw "Invalid password";
    }
    throw "Invalid email! User not found.";
  } catch (err) {
    res.status(500).send({
      message: err.message || err || "Some error occurred",
    });
  }
};
