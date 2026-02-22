require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Connect Database
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", expenseRoutes);

// Default route → Login page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});