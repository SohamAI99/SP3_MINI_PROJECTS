const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files (index.html, style.css, script.js) directly to the browser
app.use(express.static(path.join(__dirname)));

// Initialize SQLite database (in-memory for simple college project)
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error("Error creating database", err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

// Create tables and seed data
db.serialize(() => {
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, image TEXT)");

    const stmt = db.prepare("INSERT INTO products VALUES (?, ?, ?, ?)");
    stmt.run(1, 'Premium Wireless Headphones', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80');
    stmt.run(2, 'Smart Fitness Watch', 149.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80');
    stmt.run(3, 'Mechanical Keyboard', 129.99, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80');
    stmt.run(4, 'Gaming Mouse', 79.99, 'https://images.unsplash.com/photo-1527814050087-379381547914?w=500&q=80');
    stmt.run(5, '4K Desktop Monitor', 349.99, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80');
    stmt.run(6, 'USB-C Hub', 49.99, 'https://images.unsplash.com/photo-1600080838186-0708db814ebd?w=500&q=80');
    stmt.finalize();
});

// API Routes to interact with the database
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json(rows);
    });
});

// Start internal node server
app.listen(port, () => {
    console.log(`===============================================`);
    console.log(`Backend Server running on port ${port}`);
    console.log(`Access the App at: http://localhost:${port}/index.html`);
    console.log(`===============================================`);
});
