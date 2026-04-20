const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

module.exports = mongoose.model("Form", formSchema);