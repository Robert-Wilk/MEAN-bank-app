const mongoose = require('mongoose');

/**
 * User Schema
 * 
 * Author: Robert Wilk
 * 
 * Description: Holds all login information (email, password, etc.)
 *  and some account information of a user (account ids)
 * 
 * NOTE: This is definitely not a secure way to store information.
 *  Information revolving around passwords, account numbers, and card numbers, should be hashed.
 *  This is just for educational purposes as I learn the MEAN stack.
 * 
 * original source: https://github.com/bezkoder/node-js-jwt-auth-mongodb/blob/master/app/models/users.model.js
 */
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    { timestamps: true })
);

module.exports = User;