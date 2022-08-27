import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
  },
});

const pupModel = mongoose.Schema({
  name: String,
  photoURL: String,
  breed: String,
  birthday: Date,
  bio: String,
  energy: Number,
  owner_id: String,
  gender: String,
  bones: {
    type: Number,
    default: 0,
  },
  location: {
    type: pointSchema,
  },
});

export default mongoose.model("pups", pupModel);
