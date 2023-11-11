const mongoose= require("mongoose");
const customFieldSchema= mongoose.Schema({
    Group: { type: String },
    Label:{type: String},
    Section: { type: String },
    Type: { type: String },
});
const customField= mongoose.model("customField",customFieldSchema);

module.exports=customField;