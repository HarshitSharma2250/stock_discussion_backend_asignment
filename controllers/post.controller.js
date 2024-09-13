
const PostSchema=require("../models/post.model")
const commentSchema=require("../models/comment.model")

// create posts---------
const createPost=async(req,res)=>{
    try {
        const { stockSymbol, title, description, tags } = req.body;
        const newPost=new PostSchema({stockSymbol, title, description, tags,user:req.user._id })
        const savedPost=await newPost.save()


        res.status(201).json({ 
            success: true, 
            postId:savedPost._id,
             message: 'Post created successfully' 
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all posts----
const GetAllPost=async(req,res)=>{

    // queries for sorting,and searching , we can write these seperatly by using classes that will also good for big applications
    const { stockSymbol, tags, sortBy ,page = 1, limit = 10} = req.query;
    let query = {};
    if (stockSymbol) {
      query.stockSymbol = stockSymbol;
    }
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }
  
    let sort = {};
    if (sortBy) {
      const order = req.query.order === 'asc' ? 1 : -1; 
    
      if (sortBy === 'date') {
        sort.createdAt = order;
      } else if (sortBy === 'likes') {
        sort.likesCount = order;
      }
    }
        try {
          const pageNumber = parseInt(page, 10);
          const pageLimit = parseInt(limit, 10);

          if (pageNumber < 1 || pageLimit < 1) {
            return
          }
          // writing query for [postschema collection for sort,pagination,limit,select etc]
            const posts = await PostSchema.find(query).sort(sort).skip((pageNumber - 1) * pageLimit).limit(pageLimit).select('postId stockSymbol title description likesCount createdAt');

            const totalPosts = await PostSchema.countDocuments(query);

// after filter//opetrations showing on UI or send as response the data to user
            res.status(200).json({
              posts
            });
          } catch (error) {
            res.status(500).json({
              message: error.message
            });
          }
}


// delete post--------
const DeletePost=async(req,res)=>{
  const{postId}=req.params

const findPost=await PostSchema.findById(postId)
if(!findPost){
  return res.status(404).json({
    "message":"Post Not Found"
  })
}

await PostSchema.findByIdAndDelete(postId)
res.status(200).json(
  { 
    success: true,
     message: 'Post deleted successfully' 
    }
)
}


// get single post with comments---------------

const singlePost=async(req,res)=>{
  const{postId}=req.params
try {
const checkpost=await PostSchema.findById(postId)

if(!checkpost){
  return res.status(404).json({
    "message":"Post Not Found !"
  })
}

//  check if there is any commnts on this post ---------
const checkcomments=await commentSchema.find({post:postId})

const postdata = {
  postId: checkpost._id,
  stockSymbol: checkpost.stockSymbol,
  title: checkpost.title,
  description: checkpost.description,
  likesCount: checkpost.likesCount,
  createdAt: checkpost.createdAt
};

const comments = checkcomments.map(comment => ({
  commentId: comment._id,
  user: comment.user,
  comment: comment.comment
}));

// turnory operator for check id comments not found at any post---------------------
checkcomments ? res.status(200).json({
  ...postdata,
  comments: [ comments ] 
}):res.status(200).json({
  ...postdata,
})
} catch (error) {
  res.status(500).json({
    "message":error.message
  })
}
}



module.exports={createPost,GetAllPost,DeletePost,singlePost}