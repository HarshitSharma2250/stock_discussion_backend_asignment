const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [2, "length should be more than 2"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" }, 
    profilePicture: { type: String, default: "" } 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Usermodal=mongoose.model("UserModal",UserSchema)

module.exports = Usermodal;
