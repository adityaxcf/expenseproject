const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/test", (req, res) => {
    res.send("Test route working!");
});

router.get("/create-user", async (req, res) => {
    try {
        const user = new User({
            name: "Aditya",
            email: "aditya@test.com",
            password: "123456"
        });

        await user.save();

        res.send("User saved to database");
    } catch (error) {
        console.error(error);
        res.send("Error saving user");
    }
});

module.exports = router;