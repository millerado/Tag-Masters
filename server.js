// Dependencies
const express = require('express');

// Intialize App
const app = express();

// Configure Settings
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

// Connect to MongoDB

// Middleware

// Homepage Redirect

// Mount Controllers

// Listen
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
