const express = require("express");
const noteModel=require("./models/note.model")


const app=express();

app.use(express.json()); // to parse the incoming request body as JSON

/*
POST /notes - to create a new note
GET /notes - to get all the notes
DELETE /notes/:id - to delete a note by id
PATCH /notes/:id - to update a note by id
*/

app.post("/notes", async(req,res)=>{
    const data=req.body;

    await noteModel.create({
        title:data.title,
        description:data.description
    })


    res.status(201).json({
        message:"Note created successfully"
    })
})

app.get("/notes", async (req,res)=>{
    const notes=await noteModel.find();

    // find => [{},{}] or []
    // findOne => {} or null

    res.status(200).json({
        message:"Notes fetched successfully",
        notes: notes
    })
})

app.delete("/notes/:id", async (req,res)=>{
    const id= req.params.id;

    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Note deleted successfully"
    })
})

app.patch("/notes/:id", async (req,res)=>{
    const id=req.params.id;
    const description=req.body.description;
    
    await noteModel.findOneAndUpdate({
        _id:id
    },{
        description: description
    })

    res.status(200).json({
        message:"Note updated successfully"
    })
})


module.exports=app;