require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const path = require("path");

const app = express();

// ========================
// Middleware
// ========================
app.use(express.json());

// Serve frontend (public folder)
app.use(express.static(path.join(__dirname, "public")));

// ========================
// Connect MongoDB
// ========================
connectDB();

// ========================
// API Routes
// ========================
app.use("/api", authRoutes);
app.use("/api", expenseRoutes);

// ========================
// Default Route → Login Page
// ========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ========================
// Render PORT Fix (IMPORTANT)
// ========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});