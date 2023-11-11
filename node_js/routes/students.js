const express = require("express");
const student = require("../models/student");
const router = express.Router();

// Get all students
router.get("/students", async (req, res) => {
    const students = await student.find({});
    // console.log("arya connected");
    res.json(students);

});
//create a new student
router.post("/students", async (req, res) => {
    try {
        const students = new student(req.body);
        await students.save();
        // const token = jwt.sign({ id: students._id }, process.env.JWT_SECRET);
        res.status(201).send({ students });
    } catch (error) {
        res.status(400).send(error);
    }
});
// Get a student by ID
router.get("/students/:id", async (req, res) => {
    console.log(req);
    const students = await student.findById(req.params.id);
    // console.log(students);
    res.send(students);
});

router.put("/students/:id", async (req, res) => {
    const student = await student.findByIdAndUpdate(req.params.id, req.body);
    if (student) {
        res.status(200).json(student); // Send a 200 status code if the student was updated successfully
    } else {
        res.status(404).json({ message: "Student not found" }); // Send a 404 status code if the student was not found
    }
});

//delete studnet by id
router.delete("/students/:id", async (req, res) => {
    await student.findByIdAndDelete(req.params.id);
    res.json({ message: "student deleted successfully" });
});

module.exports = router;

