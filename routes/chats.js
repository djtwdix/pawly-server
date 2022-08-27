import express from "express";
import {
  createChat,
  getChatsByUserId,
  updateLastMessage,
  getChatById,
} from "../controllers/ChatControllers.js";
import { getMessagesByChatId } from "../controllers/MessageControllers.js";
const router = express.Router();

router.post("/", createChat);
router.put("/", updateLastMessage);
router.get("/all", getChatsByUserId);
router.get("/:chatId/messages", getMessagesByChatId);
router.get("/:chatId", getChatById);

export { router as chatRoutes };
