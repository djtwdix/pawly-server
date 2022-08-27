import mongoose from "mongoose";

const lastMessageModel = new mongoose.Schema(
  {
    text: String,
    //created_at: { type: Date, default: Date.now() },
  },
  { timestamps: { createdAt: "created_at" } }
);

const chatModel = mongoose.Schema(
  {
    participants: Array,
    //created_at: { type: Date, default: Date.now() },
    last_message: {
      type: lastMessageModel,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("chats", chatModel);
