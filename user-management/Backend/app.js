 console.log("hi");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/UserRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/users", router);

// 1) Start listening first (so the app is up even if Mongo is slow)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 2) Connect to Mongo (log errors if any)
mongoose
  .connect("mongodb+srv://Admin:pKFiAilbCyrZEEP5@cluster0.ctferfm.mongodb.net/")
  .then(() => console.log("connect to mongo"))
  .catch((err) => console.error("Mongo error:", err));
//regsiter-----
//call register model
  require("./Model/Register");
  const User=mongoose.model("Register");
  app.post("/register",async(req,res)=>{
    const{name,gmail,password}=req.body;
    try{
      await User.create({
        name,
        gmail,
        password,
      });
      res.send({status:"ok"});
    }catch(err){
      res.send({status:"err"});
    }
  });

  //login

  app.post("/login",async(req,res)=>{
    const{gmail,password}=req.body;
    try{
      const user=await User.findOne({gmail});
      if(!user){
        return res.json({err:"user Not Found"})
      }
      if(user.password===password)
      {
        return res.json({status:"ok"});
      }
      else{
         return  res.json({err:"incorrect password"});
      }

    }catch(err)
    {
      console.error(err);
      res.status(500).json({err:"server Err"})
    }
  });
