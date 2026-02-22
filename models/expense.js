const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);