//inputs users details 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =new Schema({
    //insert detilas font end form
    name:{
        type:String,
        required:true,//validate
    },
    gmail:{
        type:String,
        required:true,//validate
    },
    age:{
        type:Number,
        required:true,//validate
    },
     address:{
        type:String,
        required:true,//validate
    }
});
module.exports=mongoose.model(
    "UserModel",//file name
    userSchema//fun schema
)