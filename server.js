require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", expenseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});