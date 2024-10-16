import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

// POST: Create a new loan application
router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { name, email, loanAmount } = req.body;

    const newUser = new User({
      name,
      email,
      loanAmount
    });

    await newUser.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting the application.' });
  }
});

// GET: Fetch statistics for dashboard (e.g., number of applications, total loans)
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const totalApplications = await User.countDocuments({});
    const totalApproved = await User.countDocuments({ status: 'approved' });
    const totalLoanAmount = await User.aggregate([{ $group: { _id: null, total: { $sum: '$loanAmount' } } }]);

    res.json({
      totalApplications,
      totalApproved,
      totalLoanAmount: totalLoanAmount[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the dashboard data.' });
  }
});

export default router;

