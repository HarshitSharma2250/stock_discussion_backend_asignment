// models/like.model.js
const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'PostModal', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModal', required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LikeModal = mongoose.model("LikeModal", LikeSchema);

module.exports = LikeModal;
