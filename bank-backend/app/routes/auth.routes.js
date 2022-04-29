/**
 * auth.routes.js
 * Author: Robert Wilk
 * 
 * Description: Routes for authentification
 * original source: https://github.com/bezkoder/node-js-jwt-auth-mongodb/blob/master/app/routes/auth.routes.js
 */
const { verify } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verify.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};