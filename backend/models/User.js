// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the user data
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // User's email, must be unique
  password: { type: String, required: true }, // User's password
});

// Create a Mongoose model named 'User' using the userSchema
module.exports = mongoose.model('User', userSchema);
