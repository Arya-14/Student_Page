const express = require("express");
const student = require("../models/student");
const auth = require("../middleware/auth");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const imageName = Date.now();
      cb(null,imageName+ file.originalname);
    }
})
  
const upload = multer({ storage: storage });
const router = express.Router();

// Get all students
router.get("/students", auth, async (req, res) => {
    const students = await student.find({});
    res.json(students);

});
//create a new student
// router.post("/students", auth, async (req, res) => {
//     try {
//         const students = new student(req.body);
//         await students.save();
//         res.status(201).send({ students });
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });
router.post("/students", upload.single("Image"), async (req, res) => {
    console.log("img",upload.single("Image"));
    console.log("reqst",req);
    try {
        console.log("try");
        const imageName = req.file.filename;
    //   const imageName = req.body.Image;
      console.log("img",imageName);
      const { Firstname, Lastname, Class, DOB, Address, ParentsName, Id, CustomFields } = req.body;
      console.log("req",req.body);
  
      const students = new student({
        Firstname,
        Lastname,
        Class,
        DOB,
        Address,
        ParentsName,
        Id,
        Image: imageName,
        CustomFields: JSON.parse(CustomFields),
      });
      console.log("students", students);
  
      await students.save();
  
      res.status(200).send({ students });
    } catch (error) {
        console.log(error);
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
router.post("/students/upload-image",auth,upload.single("Image"), async(req, res) =>{
    console.log(req.body);
    const imageName= req.file.filename;
    try{
        await student.create({ImagePath: imageName});
        res.json({status:"ok"});
    } catch(err){
        res.json({status: err});
    }
})
// router.get("/students/get-image",auth, async(req, res) =>{
//     const imageId = req.query.imageId;

//     try {
//         const students = await student.findById(imageId);
//         const imagePath = students.ImagePath;
//         res.send({ status: "ok", data: imagePath });
//       } catch (err) {
//         res.json({ status: err });
//       }
// });

module.exports = router;

