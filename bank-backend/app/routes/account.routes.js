/**
 * account.routes.js
 * @author: Robert Wilk
 * 
 * @description: Routes for bank accounts
 */
const { authJwt, verify } = require("../middlewares");
const controller = require("../controllers/account.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/account/create", [authJwt.verifyToken, verify.checkDuplicateAccount], controller.create);
    app.get("/api/account/read/:id", authJwt.verifyToken, controller.readOne);
    app.get("/api/account/readAll", authJwt.verifyToken, controller.readAll);
    app.put("/api/account/:id", authJwt.verifyToken, controller.update);
    app.delete("/api/account/delete/:id", authJwt.verifyToken, controller.deleteOne);
    app.delete("/api/account/delete", authJwt.verifyToken, controller.deleteAll);
};