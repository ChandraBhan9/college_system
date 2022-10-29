const cors = require("cors");

module.exports = Router = (express_app) => {
  express_app.use(cors());

  // invalid url
  express_app.use("*", (req, resp, next) => {
    throw resp.status(404).send({
      message: "Please check URL, requested URL was not found.",
    });
  });
};
