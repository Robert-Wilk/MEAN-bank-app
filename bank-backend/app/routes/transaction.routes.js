/**
 * account.routes.js
 * @author: Robert Wilk
 * 
 * @description: Routes for transactions
 */
 const { authJwt, verify } = require("../middlewares");
 const controller = require("../controllers/transaction.controller.js");
 
 module.exports = function(app) {
     app.use(function(req, res, next) {
         res.header(
             "Access-Control-Allow-Headers",
             "x-access-token, Origin, Content-Type, Accept"
         );
         next();
     });
     app.post("/api/transaction/create", [authJwt.verifyToken, verify.checkDuplicateAccount], controller.create);
     app.get("/api/transaction/read/:idt/:ida", authJwt.verifyToken, controller.readOne);
     app.get("/api/transaction/readAll/:id", authJwt.verifyToken, controller.readAll);
     app.get("/api/transaction/readType", authJwt.verifyToken, controller.readType);
     app.put("/api/transaction/:id", authJwt.verifyToken, controller.update);
     app.delete("/api/transaction/delete/:id", authJwt.verifyToken, controller.deleteOne);
     app.delete("/api/transaction/delete", authJwt.verifyToken, controller.deleteAll);
 };