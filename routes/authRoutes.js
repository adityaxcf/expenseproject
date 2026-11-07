const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(userId) {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
        throw new Error("JWT_SECRET must be configured with at least 32 characters.");
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body || {};
        if (typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim()) ||
            typeof password !== "string" || password.length < 8) {
            return res.status(400).json({ message: "Enter a valid name, email and a password of at least 8 characters." });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) return res.status(409).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword });
        res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: "Email already exists" });
        res.status(500).json({ message: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        res.json({ token: createToken(user._id) });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
});

module.exports = router;
