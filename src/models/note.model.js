const mongoose=require("mongoose");

// to create a schema for the note model
const noteSchema=new mongoose.Schema({
    title: String,
    description: String,
})

// to perform CRUD operations on the note model we need to create a model using the schema
const noteModel= mongoose.model("notes",noteSchema);

module.exports=noteModel;