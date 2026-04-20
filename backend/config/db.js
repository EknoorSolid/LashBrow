const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb+srv://LashBrow:%23LashBrow%23@cluster0.vrlf5yf.mongodb.net/?appName=Cluster0";
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;