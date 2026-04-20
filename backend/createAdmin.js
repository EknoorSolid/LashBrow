const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config(); // Use .env if available

// Use the URI from .env or fallback to hardcoded
const uri = process.env.MONGO_URI || "mongodb+srv://LashBrow:%23LashBrow%23@cluster0.vrlf5yf.mongodb.net/?appName=Cluster0";
mongoose.connect(uri);

async function createOrUpdateAdmin() {
    // 🔥 CHANGE YOUR PASSWORD HERE 🔥
    const NEW_PASSWORD = "Tannu#Lash#Brow";

    const hashed = await bcrypt.hash(NEW_PASSWORD, 10);

    await Admin.findOneAndUpdate(
        { username: "admin" }, // Find user by this username
        { password: hashed },  // Update to new hashed password
        { upsert: true, new: true } // Create if doesn't exist
    );

    console.log(`Admin password has been set successfully!`);
    process.exit();
}

createOrUpdateAdmin();