const express= require("express");
const customField= require("../models/customField");
const Router = express.Router();

Router.get("/customFields",async(req,res)=> {
    const customFields= await customField.find({});
    res.json(customFields)
});

Router.post("/customFields", async(req, res)=> {
    try{
        const customFields= new customField(req.body);
        await customFields.save();
        res.status(201).send({customFields});
    } catch (error) {
        res.status(400).send(error);
    }
});

//update the student by id
Router.put("/customFields/:id", async(req, res) => {
    const customField = await customField.findByIdAndUpdate(req.params.id, req.body);
    if (customField) {
      res.status(200).json(customField); // Send a 200 status code if the student was updated successfully
    } else {
      res.status(404).json({ message: "customField not found" }); // Send a 404 status code if the student was not found
    }
  });

//delete studnet by id
Router.delete("/customFields/:id",async(req,res)=> {
    await customField.findByIdAndDelete(req.params.id);
    res.json({message: "customField deleted successfully"});
});

module.exports= Router;

