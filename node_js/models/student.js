const mongoose= require("mongoose");
// const bcrypt = require('bcryptjs');
// const validator = require('validator');
const studentSchema= mongoose.Schema({
    Firstname: { type: String },
    Lastname:{type: String},
    Address: { type: String },
    Class: { type: String },
    ParentsName: {type: String},
    DOB: {type: Date},
    Id: {type: Number},
});
// studentSchema.pre('save', async function (next) {
//     // Hash the password before saving the student model
//     const student = this
//     if (student.isModified('password')) {
//         student.password = await bcrypt.hash(student.password, 8)
//     }
//     next()
// })
const student= mongoose.model("student",studentSchema);

module.exports=student;