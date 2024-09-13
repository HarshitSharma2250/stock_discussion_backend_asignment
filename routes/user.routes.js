const express=require("express")
const UserRoutes=express.Router()
const {Authentication}=require("../middleware/AuthMiddleware")
const {userRegistration,userLogin,getuserData,UpdateUserData} =require("../controllers/user.controller")

UserRoutes.post("/api/auth/register",userRegistration)
UserRoutes.post("/api/auth/login",userLogin)
UserRoutes.get("/api/user/profile/:userId",Authentication,getuserData)
UserRoutes.put("/api/user/profile",Authentication,UpdateUserData)

module.exports=UserRoutes