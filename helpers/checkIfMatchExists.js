import Chats from "../models/ChatModel.js";

export default function checkIfMatchExists(participants) {
  return Chats.findOne({ participants: { $all: participants } });
}
