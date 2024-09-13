const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT||3000
const connection=require("./config/db")
const UserRoutes=require("./routes/user.routes")
const PostRoutes=require("./routes/post.routes")
const CommentRoutes=require("./routes/comment.routes")
const LikePostRoutes=require("./routes/likePost.route")



// intitate server
const server=express()



// middleware--------
server.use(express.json())
server.use("/user",UserRoutes)
server.use("/post",PostRoutes)
server.use("/comment",CommentRoutes)
server.use("/like",LikePostRoutes)





// home routes
server.get('/',(req,res)=>{
    res.send(`welcome to home page`)
})






// server listening

server.listen(PORT,async()=>{
    await connection
    console.log(`server is running at port ${PORT} and DB is also connected`)
})