const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");

// GET all expenses
router.get("/expenses", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

// ADD expense
router.post("/expenses", async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        const expense = new Expense({
            title,
            amount,
            category
        });

        await expense.save();

        res.json({ message: "Expense added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding expense" });
    }
});

module.exports = router;