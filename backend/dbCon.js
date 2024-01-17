const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        // connect to the database using the provided connection URI
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        // If an error occurs during connection, exit the process with a failure code
        process.exit(1);
    }
}


module.exports = connectDB;
