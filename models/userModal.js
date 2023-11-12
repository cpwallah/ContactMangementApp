const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add username"],
    },
    email:{
        type:String,
        required:[true,"Please add email address"],
        unique:[true,"email address already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add user password"],

    }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);