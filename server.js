const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

connectDB();

app.use("/", expenseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});