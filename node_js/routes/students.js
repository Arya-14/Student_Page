const express= require("express");
const student= require("../models/student");
const auth= require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const process = require('process');

const router = express.Router();

// Get all students
router.get("/students",async(req,res)=> {
    const students= await student.findAll();
    // console.log("arya connected");
    res.json(students);

});
//create a new student
router.post("/students", async(req, res)=> {
    try{
        const students= new student(req.body);
        await students.save();
        const token = jwt.sign({ id: students._id }, process.env.JWT_SECRET);
        res.status(201).send({students, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route for signup
router.post("/students/signup",async(req,res) =>{
    const{name, email, password}= req.body;
    const existingStudent= await student.findOne({email});
    if (existingStudent) {
        return res.status(409).json({ error: "Student already exists." });
    }
    // Create a new student account in the database.
    const newStudent = new student({ name, email, password });
    await newStudent.save();
    // Generate a JWT for the student.
    // const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET);
    // Send the JWT back in the response.
    res.json({ newStudent });
});
// Route for login
router.post("/students/login", async(req,res) =>{
    const{email, password}= req.body;
    const students= await student.findOne({email});
    const isPasswordMatch = await bcrypt.compare(password, students.password)
    if (!students || !isPasswordMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = jwt.sign({ id: students._id }, process.env.JWT_SECRET, {expiresIn: '12h'});
    res.status(200).json({
        message: "Login Successful",
        email: students.email,
        token,
    });
});

router.get("/students/me", auth, async(req,res) => {
    // console.log(req.headers.authorization);
    // console.log(res.json());
    res.send(req.user);
});
// Get a student by ID
router.get("/students/:id", async (req, res) => {
    console.log(req);
    const students = await student.findById(req.params.id);
    // console.log(students);
    res.send(students);
});
//update the student by id
router.put("/students/:id", async(req,res) => {
    const students=await student.findByIdAndUpdate(req.params.id, req.body);
    res.json(students);
});
router.put("/students/:id/password", async(req,res) => {
    const student = await student.findByIdAndUpdate(req.params.id, { password: req.body.newPassword });
    res.json(student);
  });
//delete studnet by id
router.delete("/students/:id",async(req,res)=> {
    await student.findByIdAndDelete(req.params.id);
    res.json({message: "student deleted successfully"});
});

module.exports= router;

