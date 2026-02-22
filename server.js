const express = require("express");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

connectDB();

app.use("/", testRoutes);
app.use("/", expenseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});