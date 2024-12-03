const apiBaseUrl = 'http://localhost:4000/expense/all'; 
const apiAddExpense = 'http://localhost:4000/expense/addExpense';
const apiDeleteExpense = 'http://localhost:4000/expense/delete/';
const apiUpdateExpense = 'http://localhost:4000/expense/update/';

// Get elements
const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
let expenses = []; // Global array to hold all fetched expenses

// Fetch and display all expenses
const fetchExpenses = async () => {
    try {
        const response = await fetch(apiBaseUrl);
        const data = await response.json();
        
        expenses = data.result; // Populate the global array with fetched data

        const expensesTableBody = document.getElementById('expenses-table-body');
        expensesTableBody.innerHTML = ''; // Clear existing rows before adding new ones

        data.result.forEach((expense) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${expense.expensename}</td>
                <td>${expense.expensetype}</td>
                <td>${expense.price}</td>
                <td>${expense.description}</td>
                <td>${expense.date}</td>
                <td>${expense.paymentMethod}</td>
                <td>
                    <button class="delete-btn" onclick="deleteExpense('${expense._id}')">Delete</button>
                    <button class="edit-btn" onclick="editExpense('${expense._id}')">Edit</button>
                </td>
            `;

            expensesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
};


// Add a new expense
expenseForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newExpense = {
        expensename: document.getElementById('expensename').value,
        expensetype: document.getElementById('expensetype').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        paymentMethod: document.getElementById('paymentMethod').value,
    };

    try {
        const response = await fetch(apiAddExpense, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense),
        });
        const result = await response.json();
        alert(result.message);
        fetchExpenses();
        expenseForm.reset();
    } catch (error) {
        console.error('Error adding expense:', error);
    }
});

// Show confirmation modal when delete button is clicked
const deleteExpense = (id) => {
    // Show the delete confirmation modal
    const modal = document.getElementById('delete-confirmation-modal');
    modal.style.display = 'block';

    // Get the "Yes" and "No" buttons
    const yesButton = document.getElementById('delete-confirm-yes');
    const noButton = document.getElementById('delete-confirm-no');

    // Event listener for "Yes" button
    yesButton.onclick = async () => {
        try {
            const response = await fetch(`${apiDeleteExpense}${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete expense with ID: ${id}`);
            }
            const result = await response.json();
            alert(result.message || 'Expense deleted successfully!');
            fetchExpenses(); // Refresh the list after deletion
            modal.style.display = 'none'; // Hide the modal
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('Failed to delete expense. Please try again.');
            modal.style.display = 'none'; // Hide the modal on error
        }
    };

    // Event listener for "No" button
    noButton.onclick = () => {
        modal.style.display = 'none'; // Hide the modal if "No" is clicked
    };
};

// Edit an expense
const editExpense = (id) => {
    console.log('Edit function called with ID:', id);
    const selectedExpense = expenses.find((exp) => exp._id === id);
    if (!selectedExpense) {
        console.log('Expense not found');
        return alert('Expense not found');
    }

    console.log('Selected Expense:', selectedExpense);

    document.getElementById('edit-expensename').value = selectedExpense.expensename;
    document.getElementById('edit-expensetype').value = selectedExpense.expensetype;
    document.getElementById('edit-price').value = selectedExpense.price;
    document.getElementById('edit-description').value = selectedExpense.description;
    document.getElementById('edit-date').value = selectedExpense.date;
    document.getElementById('edit-paymentMethod').value = selectedExpense.paymentMethod;

    document.getElementById('edit-modal').style.display = 'block';

    // Add event listener for form submission
    const editForm = document.getElementById('edit-form');
    editForm.onsubmit = async (event) => {
        event.preventDefault();
        const updatedExpense = {
            expensename: document.getElementById('edit-expensename').value,
            expensetype: document.getElementById('edit-expensetype').value,
            price: document.getElementById('edit-price').value,
            description: document.getElementById('edit-description').value,
            date: document.getElementById('edit-date').value,
            paymentMethod: document.getElementById('edit-paymentMethod').value,
        };

        try {
            const response = await fetch(`${apiUpdateExpense}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update expense with ID: ${id}`);
            }
    
            const result = await response.json();
            alert(result.message || 'Expense updated successfully!');
            fetchExpenses(); // Refresh the list after updating
            document.getElementById('edit-modal').style.display = 'none';
        } catch (error) {
            console.error('Error updating expense:', error);
            alert('Failed to update expense. Please try again.');
        }
    };
}    



// Initial fetch
fetchExpenses();
