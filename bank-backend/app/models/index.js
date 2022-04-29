/**
 * index.js
 * Author: Robert Wilk
 * 
 * Description: index for models folder
 * original source: https://github.com/bezkoder/node-js-jwt-auth-mongodb/blob/master/app/models/index.js
 */
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.account = require("./account.model.js");
db.user = require("./user.model.js");
db.transaction = require("./transaction.model.js");

module.exports = db;