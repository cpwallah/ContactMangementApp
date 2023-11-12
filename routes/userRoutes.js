const express=require("express");
const { loginUser, currentUser, registerUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router=express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current", validateToken, currentUser)

module.exports=router;