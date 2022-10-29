const jwt = require("jsonwebtoken");

module.exports = class JWTHelper {
  constructor(props) {
    return this;
  }

  // bycript payload to jwt token
  bcrypt(
    payload,
    secret = process.env.SK_TOKEN_SECRET,
    expiresIn = { expiresIn: "7d" }
  ) {
    return jwt.sign(payload, secret, expiresIn);
  }

  // decrypt jwt token
  decrypt(token) {
    let secret = process.env.SK_TOKEN_SECRET;
    return jwt.verify(token, secret, (err, data) => {
      if (err) return err;
      return data;
    });
  }
};
