const express = require('express');
const cors = require('cors'); // Require CORS library to handle cross-origin requests

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle CORS
app.use(cors({
    origin: '*' // Adjust this to restrict to specific domains as necessary
}));

// Middleware to parse JSON bodies
app.use(express.json());

// POST Endpoint: /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate if data is provided and is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input format, expected an array'
        });
    }

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestAlphabet = '';

    data.forEach(item => {
        if (typeof item === 'number') {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (!highestAlphabet || item.toLowerCase() > highestAlphabet.toLowerCase()) {
                highestAlphabet = item;
            }
        }
    });

    // Construct response
    res.json({
        is_success: true,
        user_id: "shaik_mansur_24091999",  // Customize with your actual user ID
        email: "your_email@college.edu",  // Customize with your actual email
        roll_number: "CS12345",  // Customize with your actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

// GET Endpoint: /bfhl
app.get('/bfhl', (req, res) => {
    // This GET request can be used to check if the service is up and running
    res.status(200).json({ message: 'Service is operational' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
