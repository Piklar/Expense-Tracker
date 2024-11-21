require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const expenseRoutes = require("./routes/Expense-Routes.js");



// MongoDB Connection
mongoose.connect(process.env.MONGODB_EXPENSETRACKER)
  .then(() => console.log('Connected to Expense Tracker DB'))
  .catch(err => console.log('MongoDB connection error:', err));

mongoose.connection.once("open", () => console.log('Now connected to MongoDB Atlas'));

// Backend Routes
app.use("/expense", expenseRoutes);

app.listen(process.env.PORT || 4000, () => console.log(`API is now connected on port ${process.env.PORT || 4000}`));

  
  



