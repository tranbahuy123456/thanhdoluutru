import express from "express";
import cors from "cors";
import http from "http";
import { connectDb } from "./configs/dataBase.configs.js";
connectDb();
import cookieParser from "cookie-parser";
import cookie from "cookie";
//dirname
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
import dotenv from "dotenv";
dotenv.config();

import UserSchema from "./models/auth.models.js";
import rootRoutes from "./routes/rootRoutes.js";

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  })
);
app.use(express.json());
app.use("/api", rootRoutes);

//
import Task from "./models/task.models.js";
import Role from "./models/role.models.js"
app.get('/role',async (req,res)=>{
  const {id,email,role}=req.query;
  if(email && role){
      await UserSchema.updateOne({email},{$set:{role:role}})
      return res.json({status:true,msg:"Thành công"});
  }
  else if(role){
    try{
      const result=await Role.findOne({name:role});
      return res.json(result)
    }catch(err){res.json(err)}

  }
  else{
    try{
      const AllRole=await Role.find({});
      res.json(AllRole);
    }
    catch(err){res.json(err)}
  }
})
app.get("/task", async (req, res) => {
  const { role,task,type } = req.query;
  if (role&&task&&type) {
    //nếu có role và task thì xem như là trường hợp update dữ liệu 
    try {
      const MeeRole=await Role.findOne({name:role});
      if(type=='add'){
        const newArr=MeeRole['task'];//tạo 1 mảng mới là mục task của Role
        if(!MeeRole['task'].includes(task)){
          newArr.push(task);//thêm task mới vào mảng
          await Role.updateOne({name:role},{$set:{task:newArr}});
          return res.json({status:true,msg:"update thành công"})
        }
      }
      else if(type=='delete'){
        const newArr=[];
        MeeRole['task'].forEach(value=>{
          if(value!=task)newArr.push(value);
        })
        await Role.updateOne({name:role},{$set:{task:newArr}});
        return res.json({status:true,msg:"update thành công"})
      }
    } catch(err){res.json(err)}
  }
  // nếu ko có thì xem như trường hợp load dữ liệu
  else{
    try{
      const AllTask=await Task.find({});
      res.json(AllTask);
    }
    catch(err){res.json(err)}
  }
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');

})
server.listen(8080, (req, res) => {
  // console.log(4000)
});

export const viteNodeApp = app;
