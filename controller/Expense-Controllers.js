const Expense = require("../models/Expense-Model.js");

module.exports.addExpense = (req, res) => {
    let {expensename, expensetype, price, description, date, paymentMethod} = req.body;
    let newExpense = new Expense({
        expensename: expensename,
        expensetype: expensetype,
        price: price,
        description: description,
        date: date,
        paymentMethod: paymentMethod
    })

    return newExpense.save().then(result => {
        return res.send({
            code: "Expense added.",
            message: "Your expense has been added to your tracker.",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "SERVER-ERROR",
            message: "There was an error while adding the expense. Please try again later.",
            result: error
        })
    })
}

// Get all Expense
module.exports.getAllExpense = (req, res) => {
    return Expense.find({}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "Empty Repository",
                message: "No record of expense has been found.",
            })
        }else{
            return res.send({
                code: "All expenses result.",
                message: "Here are all your expenses.",
                result: result
            })
        }
    })
}

//Get specific Expense using ID
module.exports.getSpecificExpense = (req, res) => {
    const {expenseId} = req.params;
    return Expense.findById(expenseId).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "Expense Not Found",
                message: "There is no expense recording with the given ID.",
            })
        }else{
            return res.send({
                code: "Expense Found",
                message: `The data from ${expenseId.toUpperCase()}`,
                result: result
            })
        }
    })
}

// Delete specific Expense using ID
module.exports.deleteExpense = (req, res) => {
    const {expenseId} = req.params;

    return Expense.findByIdAndDelete(expenseId).then(result => {
        if (!result) {
            return res.send({
                code: "Expense Not Found",
                message: "There is no expense recording with the given ID.",
            });
        } else {
            return res.send({
                code: "Expense Deleted",
                message: `The expense with ID ${expenseId} has been deleted.`,
                result: result
            });
        }
    })
    .catch(error => {
        res.send({
            code: "SERVER-ERROR",
            message: "An error occurred while deleting the expense. Please try again later.",
            result: error
        });
    });
}

// Update specific Expense using ID
module.exports.updateExpense = (req, res) => {
    const { expenseId } = req.params;
    const { expensename, expensetype, price, description, date, paymentMethod } = req.body;
    
    return Expense.findByIdAndUpdate(
        expenseId,
        { expensename, expensetype, price, description, date, paymentMethod },
        { new: true }
    )
        .then((result) => {
            if (!result) {
                return res.status(404).send({
                    code: "Expense Not Found",
                    message: "There is no expense recording with the given ID."
                });
            } else {
                return res.status(200).send({
                    code: "Expense Updated",
                    message: `The expense with ID ${expenseId} has been updated successfully.`,
                    result: result
                });
            }
        })
        .catch((error) => {
            return res.status(500).send({
                code: "SERVER_ERROR",
                message: "An error occurred while updating the expense. Please try again later.",
                error: error.message
            });
        });
};

