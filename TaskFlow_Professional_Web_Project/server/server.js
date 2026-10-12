const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, "data", "tasks.json");
app.use(cors());
app.use(express.json({limit:"100kb"}));
app.use(express.static(path.join(__dirname, "..")));
function readTasks(){try{return JSON.parse(fs.readFileSync(DATA,"utf8"));}catch{return [];}}
function writeTasks(tasks){fs.writeFileSync(DATA,JSON.stringify(tasks,null,2));}
app.get("/api/health",(req,res)=>res.json({status:"ok",service:"TaskFlow API"}));
app.get("/api/tasks",(req,res)=>res.json(readTasks()));
app.get("/api/tasks/:id",(req,res)=>{const task=readTasks().find(t=>t.id===Number(req.params.id));if(!task)return res.status(404).json({error:"Task not found"});res.json(task);});
app.post("/api/tasks",(req,res)=>{const {title,status="todo",priority="Medium",assignee="Unassigned",due="",desc=""}=req.body||{};if(typeof title!=="string"||!title.trim())return res.status(400).json({error:"A task title is required"});const tasks=readTasks();const task={id:Math.max(0,...tasks.map(t=>Number(t.id)||0))+1,title:title.trim().slice(0,100),desc:String(desc).slice(0,1000),status:["todo","progress","review","done"].includes(status)?status:"todo",priority:["High","Medium","Low"].includes(priority)?priority:"Medium",assignee:String(assignee).slice(0,80),due:String(due).slice(0,10),createdAt:new Date().toISOString()};tasks.push(task);writeTasks(tasks);res.status(201).json(task);});
app.patch("/api/tasks/:id",(req,res)=>{const tasks=readTasks(),idx=tasks.findIndex(t=>t.id===Number(req.params.id));if(idx<0)return res.status(404).json({error:"Task not found"});const allowed=["title","desc","status","priority","assignee","due"];for(const key of allowed){if(req.body[key]!==undefined)tasks[idx][key]=req.body[key];}if(!String(tasks[idx].title||"").trim())return res.status(400).json({error:"A task title is required"});if(tasks[idx].status&&!["todo","progress","review","done"].includes(tasks[idx].status))return res.status(400).json({error:"Invalid status"});writeTasks(tasks);res.json(tasks[idx]);});
app.delete("/api/tasks/:id",(req,res)=>{const tasks=readTasks(),next=tasks.filter(t=>t.id!==Number(req.params.id));if(next.length===tasks.length)return res.status(404).json({error:"Task not found"});writeTasks(next);res.status(204).end();});
app.listen(PORT,()=>console.log(`TaskFlow API running at http://localhost:${PORT}`));