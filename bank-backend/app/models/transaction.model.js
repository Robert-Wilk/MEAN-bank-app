/**
 * Transaction Schema
 * 
 * Author: Robert Wilk
 * 
 * Description: Holds all information relating to a transaction.
 * 
 */
 const mongoose = require('mongoose');
 const { Schema } = mongoose;

const transactionSchema = Schema(
    {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        transactionType: { type: String, required: true },
        isTransfer: { type: Boolean, required: true },
        associatedAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
        secondaryAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: false, default: null },
        description: {type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);