/**
 * transaction Controller
 *
 * @author: Robert Wilk
 *
 * @description: All functions for manipulating transaction database
 *
 *
 */
const { response } = require("express");
const db = require("../models");
const Transaction = db.transaction;
const Account = db.account;

/**
 * Create a transcation for an transaction
 *
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} res response detailing function's actions
 */
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  Account.findById(req.body.associatedAccount)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        const transaction = new Transaction({
          date: req.body.date,
          amount: req.body.amount,
          isTransfer: req.body.isTransfer,
          transactionType: req.body.transactionType,
          associatedAccount: req.body.associatedAccount,
          secondaryAccount: req.body.secondaryAccount,
          description: req.body.description,
        });
        transaction.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          } else {
            return res.status(200).send({
              message: "transaction was registered successfully!",
            });
          }
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
 * Read a single transaction for an account
 *
 * Response will contain information on a single transaction.
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.readOne = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  const transactionId = req.params.idt;
  const accountId = req.params.ida;

  Account.findById(accountId)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        Transaction.findById(transactionId)
          .then((data) => {
            return res.status(200).send(data);
          })
          .catch((err) => {
            return res.status(500).send({
              message: err.message || "Unknown Error",
            });
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
 * Read all transactions of an account
 *
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.readAll = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  Account.findById(id)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        Transaction.find({ associatedAccount: id })
          .then((data) => {
            return res.send(data);
          })
          .catch((err) => {
            return res.status(500).send({
              message: err.message || "Unknown Error",
            });
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
 * Read all transactions of a given type for an account
 *
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
 exports.readType = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  Account.findById(req.body.associatedAccount)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        Transaction.find({ associatedAccount: req.body.associatedAccount,
                           transactionType: req.body.transactionType })
          .then((data) => {
            return res.send(data);
          })
          .catch((err) => {
            return res.status(500).send({
              message: err.message || "Unknown Error",
            });
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
 * Update an transaction for a user.
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
  Account.findById(req.body.associatedAccount)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        Transaction.findByIdAndUpdate(id, req.body.updates, {
          useFindAndModify: false,
        })
          .then((data) => {
            return res.send({
              message: "transaction was updated successfully.",
            });
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ message: err || "Error updating transaction" });
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
 * Delete a single transaction for a user.
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
  Account.findById(req.body.associatedAccount)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        Transaction.findByIdAndRemove(id)
          .then((data) => {
            return res.send({
              message: "transaction was deleted successfully!",
            });
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ message: err || "Error deleting transaction" });
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
 * Delete all transactions of an account.
 *
 * Response will contain confirmation of deleting a transaction
 *
 * @param {request} req
 * @param {response} res
 *
 * @return {response} response detailing function's actions
 */
exports.deleteAll = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Request cannot be empty!",
    });
  }
  Account.findById(req.body.associatedAccount)
    .then((data) => {
      if (!data) 
        return res.status(404).send({ message: "Account Not Found" });
      else if (data.accountOwner != req.userId)
        return res.status(401).send({ message: "Unauthorized!" });
      else {
        Transaction.deleteMany({ associatedAccount: data._id })
          .then((data) => {
            if (!data) 
              return res.status(404).send({ message: "Not Found" });
            else {
              return res
                .status(200)
                .send({ message: "Transaction(s) deleted successfully" });
            }
          })
          .catch((err) => {
            return res.status(500).send({ message: err });
          });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Unknown Error",
      });
    });
};