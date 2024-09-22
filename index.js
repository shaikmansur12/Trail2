const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// POST Endpoint: /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate if data is provided and is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input format' });
    }

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
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
        user_id: "shaik_mansur_24091999",  // Replace with your actual user_id format
        email: "your_email@college.edu",  // Replace with your actual email
        roll_number: "CS12345",  // Replace with your roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

// GET Endpoint: /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
