const express= require("express");
// "start": "nodemon -r esm index.js"
const studentRoutes= require("./routes/students");
const mongoose= require("mongoose");
const authRoute = require('./middleware/auth');
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
const app= express();


app.use(express.json());
app.use(cors());
// Mount the students router on the /students path
app.use(studentRoutes);
// Register the signup and login routes
app.get("/auth", authRoute, (req, res) => {
    res.json({ message: "You are authorized to access me" });
  });

// connection string to connect with mongodb using mongo atlas
// mongodb+srv://arya:tfICNeAhZluox3GJ@cluster0.gtow5cy.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    useUnifiedTopology:true,
})
.then(()=> console.log("DB is connected"))
.catch((err)=> console.log("DB is not connected",err));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

//starting the express server at port 8081
app.listen(8081, ()=> {
    console.log('server is running on port 8081');
});