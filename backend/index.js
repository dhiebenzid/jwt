require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth'); 
const mongoose = require('mongoose');
const connectDB = require('./dbCon'); 

// Connect to the MongoDB database
connectDB();
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Mount the auth routes under the '/auth' path
app.use('/auth', auth);
 
// Define a simple route for testing 
app.get('/', (req, res) => { 
    res.send('Hello World');
}); 

// Set up a listener on the database  connection event
mongoose.connection.once('open', () => {
    console.log('Connected to database');
    // Start the server on port 5000
    app.listen(5000, () => {
        console.log('Server started');
    });
});
