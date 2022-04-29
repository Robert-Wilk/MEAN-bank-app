/**
 * User Controller
 *
 * Author: Robert Wilk
 *
 * Description: All functions for manipulating user database.
 *
 * NOTE: This is definitely not a secure way to store information.
 *  Information revolving around passwords, account numbers, and card numbers, should be hashed.
 *  This is just for educational purposes as I learn the MEAN stack.
 */
const db = require("../models");
const Account = db.account;
const User = db.user;
const Transaction = db.transaction;

exports.readUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "No Request Body!" });
  }
  User.findById(req.userId)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Not Found" });
      else {
        return res.status(200).send({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          // Do not return login credentials back to site
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "No Request Body!" });
  }
  User.findByIdAndUpdate(req.userId, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Not Found" });
      else
        return res.status(200).send({ message: "User updated successfully" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

exports.deleteUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "No Request Body!" });
  }
  Account.find({ accountOwner: req.userId })
    .then((data) => {
      if (!data) 
        console.log("User has no associated accounts");
      /*
       * NOTE:
       * There is probably a better way of implementing this
       * Function gets all of user's accounts then deletes all transactions for it
       *
       */ 
      else {
        accounts = data.map((entry) => entry._id);
        accounts.forEach(function (account) {
          Transaction.remove({ associatedAccount: account })
            .then((data) => {
              if (!data) console.log("Account has no transactions");
            })
            .catch((err) => {
              return res.status(500).send({ message: err });
            });
        });
        console.log("Transaction(s) deleted Successfully");
      } 
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
  Account.deleteMany({ accountOwner: req.userId })
    .then((data) => {
      console.log("Account Deletion Complete");
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
  User.findByIdAndRemove(req.userId)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Not Found" });
      else
        return res.status(200).send({ message: "User deleted successfully" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};
