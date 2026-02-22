const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://aditya99_db_user:theplayer002@cluster0.dt8hygi.mongodb.net/expenseproject?retryWrites=true&w=majority"
        );
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database connection failed");
        process.exit(1);
    }
};

module.exports = connectDB;