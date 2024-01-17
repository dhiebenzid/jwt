// Import required modules and libraries
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route for user registration (signup)
router.post('/signup', [
    // Input validation using express-validator
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const { email, password } = req.body;

    // Validate input and return errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    // Check if the user with the same email already exists
    const duplicate = await User.findOne({ email });
    if (duplicate) {
        return res.status(403).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    // Create a JWT token
    const token = await jwt.sign({ email }, 'sfzehjfzejhh32FF783DDF8', { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
});

// Route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
    }

    try {
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({ errors: [{ msg: 'Invalid password' }] });
        }

        const token = await jwt.sign({ email }, 'sfzehjfzejhh32FF783DDF8', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
});


router.get('/all', (req, res) => {
    res.json(users);
});


module.exports = router;
