const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const auth = require("../middleware/auth");

// Get user expenses only
router.get("/expenses", auth, async (req, res) => {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
});

// Add expense
router.post("/expenses", auth, async (req, res) => {
    const { title, amount, category } = req.body;

    const expense = new Expense({
        title,
        amount,
        category,
        user: req.user.id
    });

    await expense.save();
    res.json(expense);
});

// Update expense
router.put("/expenses/:id", auth, async (req, res) => {
    const { title, amount, category } = req.body;

    const expense = await Expense.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title, amount, category },
        { new: true }
    );

    res.json(expense);
});

// Delete expense
router.delete("/expenses/:id", auth, async (req, res) => {
    await Expense.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    res.json({ message: "Deleted" });
});

module.exports = router;