/**
 * Account Controller
 *
 * @author: Robert Wilk
 *
 * @description: All functions for manipulating accounts database.
 *
 *      Routing number = 930126805
 */
const { response } = require("express");
const db = require("../models");
const Account = db.account;
const Transaction = db.transaction;

/**
 * Create a checking or savings account for a user.
 *
 * Account Number is a randomly generated 10 digit long integer.
 * cardNumber will pass a true or false value to generate a cardnumber.
 * accountType should be "checking" or "savings."
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} res response detailing function's actions
 */
exports.create = (req, res) => {
  var account;

  if (!req.body.cardNumber) {
    account = new Account({
      accountType: req.body.accountType,
      amount: req.body.amount,
      accountNumber: parseInt(Math.random() * 1000000000, 10),
      accountOwner: req.userId,
    });
  } else if (req.body.cardNumber) {
    account = new Account({
      accountType: req.body.accountType,
      amount: req.body.amount,
      cardNumber: parseInt(
        (Math.random() + " ").substring(2, 10) +
          (Math.random() + " ").substring(2, 10)
      ),
      accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
      accountOwner: req.userId,
    });
  } else {
    return res
      .status(400)
      .send({ message: "cardNumber cannot be empty or non-boolean value!" });
  }
  account.save((err) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    return res.send({ message: "Account was registered successfully!" });
  });
};

/**
 * Read a single account for a user.
 *
 * Response will contain information on a single account.
 * Request will need to specify an accountType ("Checking" or "Savings")
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.readOne = (req, res) => {
  const id = req.params.id;
  Account.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Account Not Found" });
      } else if (data.accountOwner != req.userId) {
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Unknown Error",
      });
    });
};

/**
 * Read all accounts of a user.
 *
 * Response will contain information on all accounts for a specific user.
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.readAll = (req, res) => {
  Account.find({ accountOwner: req.userId })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Unknown Error",
      });
    });
};

/**
 * Update an account for a user.
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  const id = req.params.id;
  Account.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Account Not Found" });
      } else if (data.accountOwner != req.userId) {
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then((data) => {
            return res.send({ message: "Account was updated successfully." });
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ message: err || "Error updating account" });
          });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Unknown Error",
      });
    });
};

/**
 * Delete a single account for a user.
 *
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.deleteOne = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  const id = req.params.id;
  Account.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Account Not Found" });
      } else if (data.accountOwner != req.userId) {
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        Account.findByIdAndRemove(id)
          .then((data) => {
            return res.send({ message: "Account was deleted successfully!" });
          })
          .catch((err) => {
            res.status(500).send({ message: err || "Error deleting account" });
          });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Unknown Error",
      });
    });
};

/**
 * Delete all acounts of a user.
 *
 * Response will contain information on a single account.
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.deleteAll = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "No Request Body!" });
  }
  Account.find({ accountOwner: req.userId })
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "No Accounts Found" });
      /*
       * NOTE:
       * There is probably a better way of implementing this
       * Function gets all of user's accounts then deletes all transactions for it
       * 
       */ 
      else {
        accounts = data.map((entry) => entry._id);
        accounts.forEach(function (account) {
        Transaction.deleteMany({ associatedAccount: account })
          .then((data) => {
            if (!data) 
              console.log("Account has no transactions");
          })
          .catch((err) => {
            return res.status(500).send({ message: err });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
  Account.deleteMany({ accountOwner: req.userId })
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Not Found" });
      else {
        return res
          .status(200)
          .send({ message: "Account(s) deleted successfully" });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};
