const express = require("express");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/", testRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});