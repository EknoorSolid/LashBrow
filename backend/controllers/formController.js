const Form = require("../models/Form");
const { Parser } = require("json2csv");

exports.submitForm = async (req, res) => {
    try {
        const newForm = new Form(req.body);
        await newForm.save();
        res.json({ message: "Form submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getForms = async (req, res) => {
    const data = await Form.find().sort({ createdAt: -1 });
    res.json(data);
};

exports.exportCSV = async (req, res) => {
    try {
        const data = await Form.find();

        const parser = new Parser();
        const csv = parser.parse(data);

        res.header("Content-Type", "text/csv");
        res.attachment("form-data.csv");

        return res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};