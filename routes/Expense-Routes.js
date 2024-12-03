// Expense-Routes.js
const express = require("express");
const router = express.Router();
const expenseController = require("../controller/Expense-Controllers.js");

// Create Expense
router.post("/addExpense", expenseController.addExpense);

// Get all Expenses
router.get("/all", expenseController.getAllExpense);

// Get specific Expense by ID
router.get("/search/:expenseId", expenseController.getSpecificExpense);

//Delete specific Expense by ID
router.delete("/delete/:expenseId", expenseController.deleteExpense);

//Update specific Expense by ID
router.put("/update/:expenseId", expenseController.updateExpense);

module.exports = router;
