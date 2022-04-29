/**
 * user.routes.js
 * Author: Robert Wilk
 * 
 * Description: Routes for users
 * original source: https://github.com/bezkoder/node-js-jwt-auth-mongodb/blob/master/app/routes/user.routes.js
 */
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create is handled by the auth routes/controller
  app.get("/api/user/read", authJwt.verifyToken, controller.readUser);
  app.put("/api/user/update", authJwt.verifyToken, controller.updateUser);
  app.delete("/api/user/delete", authJwt.verifyToken, controller.deleteUser);
};