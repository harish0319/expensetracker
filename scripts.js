document.addEventListener('DOMContentLoaded', (event) => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expensesList = document.getElementById('expenses-list');

    // Load expenses from local storage
    const loadExpenses = () => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => addExpenseToDOM(expense));
    };

    // Save expenses to local storage
    const saveExpenses = (expenses) => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Add expense to DOM
    const addExpenseToDOM = (expense) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span class="expense-item">${expense.name} - ${expense.amount.toFixed(2)}</span>
            <div>
                <button class="btn btn-sm btn-warning me-2 edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>
        `;
        li.querySelector('.edit-btn').addEventListener('click', () => {
            editExpense(expense, li);
        });
        li.querySelector('.delete-btn').addEventListener('click', () => {
            removeExpense(expense);
            li.remove();
        });
        expensesList.appendChild(li);
    };

    // Remove expense from local storage
    const removeExpense = (expenseToRemove) => {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses = expenses.filter(expense => expense.name !== expenseToRemove.name || expense.amount !== expenseToRemove.amount);
        saveExpenses(expenses);
    };

    // Edit expense
    const editExpense = (expense, listItem) => {
        // Pre-fill the form with the current expense details
        expenseName.value = expense.name;
        expenseAmount.value = expense.amount;
        // Remove the current expense from the list and local storage
        listItem.remove();
        removeExpense(expense);
    };

    // Handle form submit
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expense = {
            name: expenseName.value,
            amount: parseFloat(expenseAmount.value)
        };
        addExpenseToDOM(expense);
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        saveExpenses(expenses);
        expenseForm.reset();
    });

    // Initial load
    loadExpenses();
});