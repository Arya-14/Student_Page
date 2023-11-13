const express = require("express");
const student = require("../models/student");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all students
router.get("/students", auth, async (req, res) => {
    const students = await student.find({});
    res.json(students);

});
//create a new student
router.post("/students", auth, async (req, res) => {
    try {
        const students = new student(req.body);
        await students.save();
        res.status(201).send({ students });
    } catch (error) {
        res.status(400).send(error);
    }
});
// Get a student by ID
router.get("/students/:id", auth, async (req, res) => {
    console.log(req);
    const students = await student.findById(req.params.id);
    res.send(students);
});

router.put("/students/:id", auth, async (req, res) => {
    console.log(req.params, req.body);
    const students = await student.findByIdAndUpdate(req.params.id, req.body);
    if (students) {
        res.status(200).json(req.body); // Send a 200 status code if the student was updated successfully
    } else {
        res.status(404).json({ message: "Student not found" }); // Send a 404 status code if the student was not found
    }
});

//delete studnet by id
router.delete("/students/:id", auth, async (req, res) => {
    await student.findByIdAndDelete(req.params.id);
    res.json({ message: "student deleted successfully" });
});

module.exports = router;

