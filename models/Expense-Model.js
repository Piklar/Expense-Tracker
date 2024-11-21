const mongoose = require('mongoose');

// Define the expense schema
const expenseSchema = mongoose.Schema({
  expensename:   {type: String,  required: true},
  expensetype:   {type: String,  required: true},
  price:         {type: Number,  required: true},
  description:   {type: String,  default: '' },
  date:          {type: Date,    required: true, default: Date.now},
  paymentMethod: {type: String,  default: 'Cash' },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);


