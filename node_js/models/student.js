const mongoose= require("mongoose");

const studentSchema= mongoose.Schema({
    Firstname: { type: String },
    Lastname:{type: String},
    Address: { type: String },
    Class: { type: String },
    ParentsName: {type: String},
    DOB: {type: Date},
    Id: {type: Number},
    Image: {type: String},
    CustomFields: [
        {
          Group: { type: String },
          Section: { type: String },
          Label: { type: String },
          Type: { type: String },
          Value: { type: String },
        },
      ],
});
const student= mongoose.model("student",studentSchema);

module.exports=student;