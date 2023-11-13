const express = require("express");
const user = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const process = require('process');

const route = express.Router();

route.post("/users/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User already exists." });
    }
    // Create a new student account in the database.
    const newUser = new user({ name, email, password });
    await newUser.save();
    res.json({ newUser });
});
// Route for login
route.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    const users = await user.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(password, users.password)
    if (!users || !isPasswordMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.status(200).json({
        message: "Login Successful",
        email: users.email,
        name: users.name,
        token,
    });
});

route.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});
route.post("/users/checklogin", auth, async (req, res) => {
    console.log("req.decoded", req.decoded);
    const users = await user.findById(req.decoded.id);
    if (!users) {
        return res.status(401).json({ error: "Invalid email or password." });
    }
    res.status(200).json({
        message: "Login Successful",
        email: users.email,
        name: users.name,
    });
});
route.put("/users/password", auth, async (req, res) => {
    console.log("req.decoded", req.decoded);
    const newPassword = await bcrypt.hash(req.body.newPassword, 8)
    const users = await user.findByIdAndUpdate(req.decoded.id, { password: newPassword });
    res.json(users);
});


module.exports = route;

