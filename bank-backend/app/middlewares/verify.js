/**
 * verify.js
 * Author: Robert Wilk
 * 
 * Description: verification methods for banking application
 * original source: https://github.com/bezkoder/node-js-jwt-auth-mongodb/blob/master/app/middlewares/verifySignUp.js
 */
const db = require("../models");
const User = db.user;
const Account = db.account;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};
 
checkDuplicateAccount = (req, res, next) => {
  Account.find({
    accountOwner: req.userId,
    accountType: req.body.accountType
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
 
    if (user.length >= 1) {
      console.log(user);
      res.status(400).send({ message: "Failed! User already has account!" });
      return;
    }
 
    next();
   });
 };
const verify = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateAccount
};

module.exports = verify;