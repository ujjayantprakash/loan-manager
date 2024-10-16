"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// POST: Create a new loan application
router.post('/submit', async (req, res) => {
    try {
        const { name, email, loanAmount } = req.body;
        const newUser = new user_1.default({
            name,
            email,
            loanAmount
        });
        await newUser.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while submitting the application.' });
    }
});
// GET: Fetch statistics for dashboard (e.g., number of applications, total loans)
router.get('/dashboard', async (req, res) => {
    var _a;
    try {
        const totalApplications = await user_1.default.countDocuments({});
        const totalApproved = await user_1.default.countDocuments({ status: 'approved' });
        const totalLoanAmount = await user_1.default.aggregate([{ $group: { _id: null, total: { $sum: '$loanAmount' } } }]);
        res.json({
            totalApplications,
            totalApproved,
            totalLoanAmount: ((_a = totalLoanAmount[0]) === null || _a === void 0 ? void 0 : _a.total) || 0
        });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the dashboard data.' });
    }
});
exports.default = router;
