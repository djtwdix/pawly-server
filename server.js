import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { userRoutes } from "./routes/users.js";
import { pupsRoutes } from "./routes/pups.js";
import { chatRoutes } from "./routes/chats.js";
import { messageRoutes } from "./routes/messages.js";
import  cookieSession from "cookie-session";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

const httpServer = http.createServer(app);

//CORS used for websockets
app.use(cors());

app.use(express.json());

//cookies for back-end session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


//websockets with CORS init
const io = new Server(httpServer, {
  cors: {
    origin: "https://pawly-db5d9.web.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("messages", (data) => {
    io.emit("messages", data);
  });
});

//mongoDB connection
mongoose.connect("mongodb+srv://djtwdix:danielspassword@pawly-db.k9rol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to MongoDB");
});

//app routes
app.use("/users", userRoutes);
app.use("/pups", pupsRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Pawly");
});

//server port
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
