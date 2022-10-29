const JWTHelper = require("../helper/jwt");

function _parseToken(req) {
  // get access-token from header
  let token = req.headers["authorization"];

  //make sure user have
  if (!token) {
    return null;
  }

  // make sure bearer token must be exist
  if (!token.match(/bearer:/i)) {
    return null;
  }

  // get access token from bearer token
  return token.replace(/bearer:/i, "");
}

async function _Validate_Session(req, resp, next) {
  let access_token, session;

  access_token = _parseToken(req);

  session = new JWTHelper().decrypt(access_token);

  if (access_token && session.user_id) {
    // add session in req object
    req.session_data = session;

    return req;
  }
  // if session does not exit then throw error
  throw resp.status(402).send({
    message: "Your session has been expired or invalid session data!",
  });
}

module.exports = function (type) {
  return async function (req, resp, next) {
    try {
      switch (type) {
        case "user":
          await _Validate_Session(req, resp, next);
          break;
        default:
          resp.status(401).send({
            message: "Invalid auth requested",
          });
      }
    } catch (error) {
      next(error);
    }
    next();
  };
};
