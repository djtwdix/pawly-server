import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"]
  },
  coordinates: {
    type: [Number],
  },
});

const userModel = mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  photoURL: String,
  bio: String,
  blocks: Array,
  likes: Array,
  location: {
    type: pointSchema,
  },
});

export default mongoose.model("users", userModel);
