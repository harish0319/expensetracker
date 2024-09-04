document.addEventListener('DOMContentLoaded', (event) => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseDescription = document.getElementById('expense-description');
    const expenseType = document.getElementById('expense-type');
    const expensesList = document.getElementById('expenses-list');

    // Load expenses from the server
    const loadExpenses = async () => {
        try {
            const response = await fetch('/api/expenses');
            const expenses = await response.json();
            expensesList.innerHTML = ''; // Clear the list before adding items
            expenses.forEach(expense => addExpenseToDOM(expense));
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    };

    // Add expense to DOM
    const addExpenseToDOM = (expense) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span class="expense-item">${expense.name} - ${expense.amount.toFixed(2)} - ${expense.description} - ${expense.type}</span>
            <div>
                <button class="btn btn-sm btn-warning me-2 edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>
        `;
        li.querySelector('.edit-btn').addEventListener('click', () => {
            editExpense(expense, li);
        });
        li.querySelector('.delete-btn').addEventListener('click', async () => {
            await removeExpense(expense);
            li.remove();
        });
        expensesList.appendChild(li);
    };

    // Remove expense from the server
    const removeExpense = async (expenseToRemove) => {
        try {
            await fetch(`/api/expenses/${expenseToRemove.id}`, { method: 'DELETE' });
        } catch (error) {
            console.error('Error removing expense:', error);
        }
    };

    // Edit expense
    const editExpense = (expense, listItem) => {
        // Pre-fill the form with the current expense details
        expenseName.value = expense.name;
        expenseAmount.value = expense.amount;
        expenseDescription.value = expense.description;
        expenseType.value = expense.type;
        // Remove the current expense from the list and server
        listItem.remove();
        removeExpense(expense);
    };

    // Handle form submit
    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!expenseForm.checkValidity()) {
            expenseForm.classList.add('was-validated');
            return;
        }
        const expense = {
            name: expenseName.value,
            amount: parseFloat(expenseAmount.value),
            description: expenseDescription.value,
            type: expenseType.value
        };

        try {
            const response = await fetch('/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense)
            });

            if (response.ok) {
                const newExpense = await response.json();
                addExpenseToDOM(newExpense);
            } else {
                console.error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        expenseForm.reset();
        expenseForm.classList.remove('was-validated');
    });

    // Initial load
    loadExpenses();
});