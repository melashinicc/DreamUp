const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow requests from frontend

// Connect to SQLite database (or create if not exists)
const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create "Profiles" table if not exists
db.run(
    `CREATE TABLE IF NOT EXISTS Profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`,
    (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Profiles table is ready.");
        }
    }
);
// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("Received login request for email:", email); // Log the email for debugging

    db.get("SELECT * FROM Profiles WHERE email = ?", [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        console.log("User found, comparing passwords...");

        // Compare the hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: "Password verification failed" });
            }
            console.log("Password comparison result:", isMatch); // Log comparison result

            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
        
            console.log("Password match successful.");
            res.json({ message: "Login successful", user });
        });
    });
});

// save user API
app.post("/save-user", (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before saving it to the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: "Password hashing failed" });
        }

        db.run(
            "INSERT INTO Profiles (name, email, password) VALUES (?, ?, ?)",
            [fullName, email, hashedPassword],
            function (err) {
                if (err) {
                    console.error("Error saving user:", err.message);
                    return res.status(400).json({ error: err.message });
                }
                res.json({ id: this.lastID, message: "User saved successfully" });
            }
        );
    });
});



//   API to get all users from SQLite (for testing)
app.get("/users", (req, res) => {
    db.all("SELECT id, name, email FROM Profiles", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
