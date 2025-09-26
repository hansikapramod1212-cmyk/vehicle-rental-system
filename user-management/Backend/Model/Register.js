const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regiSchema =new Schema({
    //insert detilas font end form
    name:{
        type:String,
        required:true,//validate
    },
    gmail:{
        type:String,
        required:true,//validate
    },
    password:{
        type:String,
        required:true,//validate
    }
     
});
module.exports=mongoose.model(
    "Register",//file name
    regiSchema//fun schema
)