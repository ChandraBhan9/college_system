const cors = require("cors");
const AuthMiddleware = require("./middleware/auth");
const AuthController = require("./controllers/auth");
const UserController = require("./controllers/user");

module.exports = Router = (express_app) => {
  express_app.use(cors());

  // routes

  // auth
  express_app.post("/auth/login", AuthController.login);

  // auth middlewate
  express_app.use(AuthMiddleware("user"));

  // users
  express_app.post("/user/create", UserController.create);
  express_app.post("/user/update", UserController.update);
  express_app.post("/user/list", UserController.list);

  // course
  express_app.post("/course/create", CourseController.create);
  express_app.post("/course/update", CourseController.update);
  express_app.post("/course/list", CourseController.list);
  express_app.post("/course/enroll", CourseController.enroll);

  // invalid url
  express_app.use("*", (req, resp, next) => {
    throw resp.status(404).send({
      message: "Please check URL, requested URL was not found.",
    });
  });
};
