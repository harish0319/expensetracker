const Expense = require('../models/Expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

// Create a new expense
exports.createExpense = async (req, res) => {
    const { name, amount, description, type } = req.body;
    try {
        const newExpense = await Expense.create({ name, amount, description, type });
        res.json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.destroy({ where: { id } });
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};