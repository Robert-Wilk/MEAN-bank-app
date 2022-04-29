/**
 * Account Schema
 * 
 * Author: Robert Wilk
 * 
 * Description: Holds all banking information of a user.
 *  The model is good for both savings and checkings accounts
 * 
 * NOTE: This is definitely not a secure way to store information.
 *  Information revolving around passwords, account numbers, and card numbers, should be hashed.
 *  This is just for educational purposes as I learn the MEAN stack.
 * 
 */
const mongoose = require('mongoose');

const Account = mongoose.model(
    "Account",
    new mongoose.Schema({
        accountType: { type: String, required: true },
        amount: { type: Number, required: false, default: 0.0},
        cardNumber: { type: Number, required: false, default: null},
        accountNumber: { type: Number, required: true },
        accountOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
        // Routing number = 930126805
    },
    { timestamps: true })
);

module.exports = Account;