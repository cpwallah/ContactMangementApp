const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModal");
const expiresIn = '1h';
// @desc register the user
// @route Get /api/users/register
// @access public
const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("HashedPassword:",hashedPassword);
    
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    })

    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message:"Register the user"});
});


// @desc login user
// @route Get /api/users/login
// @access public
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user =await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
  
});

// @desc current user information
// @route Get /api/users/current
// @access private
const currentUser=asyncHandler(async(req,res)=>{
    res.json({message:"current user information"});
});


module.exports={registerUser,loginUser,currentUser}
