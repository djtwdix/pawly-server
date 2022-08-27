import Chats from "../models/ChatModel.js";
import checkIfMatchExists from "../helpers/checkIfMatchExists.js";

export const createChat = async (req, res) => {
  const participants = req.body.participants;
  const last_message = req.body.last_message;

  const alreadyExists = await checkIfMatchExists(participants);
  if (!alreadyExists) {
    Chats.create({ participants, last_message }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  }
};

export const getChatById = (req, res) => {
  const chat_id = req.params.chatId;
  Chats.findOne({ _id: chat_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

export const updateLastMessage = (req, res) => {
  const last_message = req.body.lastMessage;
  Chats.updateOne(
    { _id: last_message.chat_id },
    { last_message },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
};

export const getChatsByUserId = (req, res) => {
  const user_id = req.session.user_id
  Chats.find({ participants: user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
