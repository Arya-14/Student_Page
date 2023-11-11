const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema= mongoose.Schema({
    name:{type:String,required:true},
    email: { type: String, unique:true},
    password: { type: String},
    customField: [{ type: Object}],
});
userSchema.pre('save', async function (next) {
    // Hash the password before saving the student model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const user= mongoose.model("user",userSchema);

module.exports=user;