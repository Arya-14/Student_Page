const mongoose= require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require('validator');
const studentSchema= mongoose.Schema({
    name: { type: String },
    email: { type: String, unique:true},
    address: { type: String },
    city: { type: String },
    class: { type: String },
    section: { type: String },
    pic: { type: String },
    password: { type: String},
    customField: [{ type: Object}],
});
studentSchema.pre('save', async function (next) {
    // Hash the password before saving the student model
    const student = this
    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }
    next()
})
const student= mongoose.model("student",studentSchema);

module.exports=student;