// Import Express
const express = require("express");
// This imports the Express framework

// The following Create Express Application

const app = express();
// app represents our Express application.
const PORT = 3000;
// JSON Middleware

app.use(express.json());
// This allows Express to understand JSON request bodies.

// HOME
app.get("/", (req, res) => {
    res.json({
        message: "API Testing & Error Handling Demo",
        status: "success"
    });
});

// STUDENTS
let students = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", age: 20 },
    { id: 2, name: "Priya", email: "priya@gmail.com", age: 21 }
];

app.get("/api/students", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

app.post("/api/students", (req, res) => {
    const { name, email, age } = req.body;

// Understand Validation
// This checkswhether all required values are provided
    if (!name || !email || !age) {
        return res.status(400).json({
            success: false,
            message: "Name, email and age are required"
        });
    }
// Age between 17 and 60
    if (age < 17 || age > 60) {
        return res.status(400).json({
            success: false,
            message: "Age must be between 17 and 60"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        age
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});

// PRODUCTS
const products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Mobile Phone", price: 25000 },
    { id: 3, name: "Headphones", price: 2500 }
];

app.get("/api/products", (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

app.post("/api/products", (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({
            success: false,
            message: "Product name and price are required"
        });
    }

    if (price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be greater than 0"
        });
    }

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: { name, price }
    });
});

// INTENTIONAL ERROR
app.get("/api/error", (req, res, next) => {
    const error = new Error("Something went wrong on the server");
    next(error);
});

// 404 MIDDLEWARE
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
