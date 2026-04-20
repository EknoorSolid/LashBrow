const express = require("express");
const router = express.Router();

const { submitForm, getForms, exportCSV } = require("../controllers/formController");
const Form = require("../models/Form");
const auth = require("../middleware/auth"); // 🔐 protect routes

// Public route (form submission)
router.post("/submit", submitForm);

// Protected routes (admin only)
router.get("/all", auth, getForms);
router.get("/export", auth, exportCSV);

router.delete("/:id", auth, async (req, res) => {
    try {
        await Form.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;