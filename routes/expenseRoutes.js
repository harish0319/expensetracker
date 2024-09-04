const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.createExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;