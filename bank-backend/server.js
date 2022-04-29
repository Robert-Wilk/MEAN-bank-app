/**
 * Server.js
 * Author: Robert Wilk
 * 
 * Description: Back-end for banking application
 * original source: https://github.com/bezkoder/node-js-jwt-auth-mongodb/blob/master/server.js
 */
 const express = require("express");
 const cors = require("cors");
 const dbConfig = require("./app/config/db.config");
 
 const app = express();
 
 var corsOptions = {
   origin: "http://localhost:8081"
 };
 
 app.use(cors(corsOptions));
 
 // parse requests of content-type - application/json
 app.use(express.json());
 
 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }));
 
 const db = require("./app/models");
 
 db.mongoose
   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   .then(() => {
     console.log("Successfully connect to MongoDB.");
   })
   .catch(err => {
     console.error("Connection error", err);
     process.exit();
   });
 
 // simple route
 app.get("/", (req, res) => {
   res.json({ message: "Welcome to bank application." });
 });
 
 // routes
 require("./app/routes/auth.routes")(app);
 require("./app/routes/user.routes")(app);
 require("./app/routes/account.routes")(app);
 require("./app/routes/transaction.routes")(app);
 
 // set port, listen for requests
 const PORT = process.env.PORT || 8080;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
 });