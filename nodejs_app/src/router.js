const cors = require("cors");
const UserController = require("./controllers/user");

module.exports = Router = (express_app) => {
  express_app.use(cors());

  // routes

  // users
  express_app.post("/user/create", UserController.create);
  express_app.post("/user/update", UserController.update);
  express_app.post("/user/list", UserController.list);

  // invalid url
  express_app.use("*", (req, resp, next) => {
    throw resp.status(404).send({
      message: "Please check URL, requested URL was not found.",
    });
  });
};
