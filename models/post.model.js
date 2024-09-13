const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    stockSymbol: { type: String, required: true },  
    title: { type: String, required: true },        
    description: { type: String, required: true },  
    tags: [{ type: String }],                      
    createdAt: { type: Date, default: Date.now },  
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModal', required: true },
    likesCount: { type: Number, default: 0 }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const PostModal=mongoose.model("postModal",PostSchema)

module.exports = PostModal;
