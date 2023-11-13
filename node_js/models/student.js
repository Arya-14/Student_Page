const mongoose= require("mongoose");

const studentSchema= mongoose.Schema({
    Firstname: { type: String },
    Lastname:{type: String},
    Address: { type: String },
    Class: { type: String },
    ParentsName: {type: String},
    DOB: {type: Date},
    Id: {type: Number},
});
const student= mongoose.model("student",studentSchema);

module.exports=student;