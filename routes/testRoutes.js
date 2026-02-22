const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Expense = require("../models/Expense");

// Test route
router.get("/test", (req, res) => {
    res.send("Test route working!");
});

// Register user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password
        });

        await user.save();
        res.json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Get all expenses
router.get("/expenses", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

// Add expense
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
        res.status(500).json({ message: "Error adding expense" });
    }
});

// Delete expense
router.delete("/expenses/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense" });
    }
});

module.exports = router;