const User=require("../Model/UserModel");

const getAllUsers=async(req,res,next)=>{
    let Users;

    try{
        users=await User.find();
    }catch(err)
    {
        console.log(err);
    }
    if(!users)
    {
        return res.status(404).json({message:"user not found"});
    }
    //dispaly users
    return res.status(200).json({users});
};

//data insert
const addUsers=async(req,res,next)=>{
    const{name,gmail,age,address}=req.body;
    let users;
    try{
        users=new User({name,gmail,age,address});
        await users.save();
    }catch(err){
        console.log(err);
    }
    //not insert users
    if(!users)
        {
        return res.status(404).send({message:"unable to add users"});
        }
 return res.status(200).json({users});
        };
 const getById=async(req,res,next)=>{

    const id=req.params.id;

    let user;

    try{
        user = await User.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available users
    if(!user)
    {
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({user});
 }
 //update user details
 const updateUser=async(req,res,next)=>
 {
    const id=req.params.id;
    const{name,gmail,age,address}=req.body;

    let users;

    try{
        users=await User.findByIdAndUpdate(id,{
            name:name,gmail:gmail,age:age,address:address});
            users=await users.save();
        }catch(err)
        {
            console.log(err);
        }
        //not availavlre user
        if(!users)
    {
        return res.status(404).json({message:"unable o update user details"});
    }
    return res.status(200).json({users});
    };
    //delete 
    const deleteUser=async(req,res,next)=>{
        const id=req.params.id;
        let user;

        try{
            user=await User.findByIdAndDelete(id)
        }catch(err)
        {
            console.log(err);
        }
        if(!user)
    {
        return res.status(404).json({message:"unable to delete"});
    }
    return res.status(200).json({user});
    };
 
exports.addUsers=addUsers;
exports.getAllUsers=getAllUsers;
exports.getById=getById;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;