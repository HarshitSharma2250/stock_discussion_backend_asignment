const UserSchema=require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require("dotenv")
dotenv.config()


// user registration ----------
const userRegistration=async(req,res)=>{
const{username,email,password}=req.body
try {
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
         return res.status(500).json({
             "message":"something going wrong while registration !"
         })
        }
     
const adduser=new UserSchema({username,email,password:hash})
const savedUser=  await adduser.save()
res.status(201).json({
    "success": true,
    "message": "User registered successfully",
    "userId": savedUser._id,
})
});
}catch (error) {
    res.status(500).json({
        "message":error.message
    })
}
}

// user login---------------
const userLogin=async(req,res)=>{
const{email,password}=req.body
try {
    let findUser=await UserSchema.findOne({email})
    if(!findUser){
return res.status(404).json({
    "message":"Invalid Credentials ! Please Login Again"
})
    }
// here authentication , compare registration password and login password
    bcrypt.compare(password, findUser.password, function(err, result) {  
       if(err){
        res.status(500).json({
            "message":res.message
        })
       }
    });

 token = jwt.sign({id:findUser._id, email: findUser.email,}, `${process.env.TOKEN_KEY}`); // generate token also add expire time 

res.status(200).json({
    token,
    user: {
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
    },
})
} catch (error) {
    res.status(500).json({
        "message":error.message
    })
} 
}


// get user info
const getuserData=async(req,res)=>{
const{userId}=req.params

try {
    const finduser=await UserSchema.findById(userId)
if(!finduser){
    return res.status(404).json({
        "message":"User Not Found"
    })
}
res.status(200).json({
    id:finduser.id,
    username:finduser.username,
    bio:finduser.bio,
    profilePicture:finduser.profilePicture
})
} catch (error) {
    res.status(500).json({
        "message":error.message
    })
}

}

// update user profile

const UpdateUserData=async(req,res)=>{
try {
    const userData=req.body
    let getid=req.user._id
      await UserSchema.findByIdAndUpdate(getid,userData)
  res.status(200).json({
  success: true, 
  message: 'Profile updated' 
  })
} catch (error) {
    res.status(500).json({
        "message":error.message
    })
}
}



module.exports={userRegistration,userLogin,getuserData,UpdateUserData}