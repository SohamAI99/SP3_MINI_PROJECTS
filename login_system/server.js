const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static HTML/JS/CSS files
app.use(express.static(path.join(__dirname)));

// 📁 "Store user data in JavaScript array (no database)" requirement
const usersArray = [];

// Signup API Route
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const userExists = usersArray.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ error: "User with this email already exists" });
    }

    // Save user to array (In a real production app, never store plaintext passwords!)
    const newUser = { id: Date.now(), username, email, password }; 
    usersArray.push(newUser);
    
    res.status(201).json({ message: "Registration successful" });
});

// Login API Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // Check credentials against the JS array
    const user = usersArray.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Only return safe data (exclude password)
        res.status(200).json({ 
            message: "Login successful", 
            user: { username: user.username, email: user.email } 
        });
    } else {
        res.status(401).json({ error: "Invalid email or password" });
    }
});

app.listen(port, () => {
    console.log(`===============================================`);
    console.log(`Auth Server running on port ${port}`);
    console.log(`Access the App at: http://localhost:${port}/index.html`);
    console.log(`===============================================`);
});
