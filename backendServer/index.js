const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb://localhost:27017/employee`);

const SECRET_KEY = "yourSecretKey"; 
app.listen(3003, () => {
    console.log(`server running`);
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: "error",
                message: "User already registered with this email"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await EmployeeModel.create({ name, email, password: hashedPassword });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Registration failed"
        });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "No user found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Incorrect password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: "success",
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({
            status: "error",
            message: "Login failed"
        });
    }
});
