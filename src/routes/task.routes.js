const express= require("express");  
const router = express.Router();

const Task = require("../model/task")

router.get("/", async (req,res)=>{
    const tasks= await Task.find();
    res.json(tasks);
});

router.get("/:id", async (req,res)=>{
const tasks = await Task.findById(req.params.id);
res.json(tasks)

});

router.post("/", async (req,res)=>{
    const {title, descripcion}= req.body;
    const task  = new Task({title,descripcion});
    await task.save();  
    res.json({status : "tarea guardada"});
});


router.put("/:id", async (req,res)=>{
    const {title, descripcion}= req.body;
    const newTask = {title, descripcion};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: "Task Updated"});
});

router.delete("/:id", async (req,res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: "tarea eliminada"});
});

module.exports= router;