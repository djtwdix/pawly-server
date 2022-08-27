import mongoose from "mongoose";

const messageModel = mongoose.Schema({
  chat_id: String,
  sender_id: String,
  text: String
  //created_at: { type: Date, default: Date.now() },
}, {timestamps: { createdAt: 'created_at' }});


export default mongoose.model("messages", messageModel);
