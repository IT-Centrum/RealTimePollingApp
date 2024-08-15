const http = require("http");
const express = require("express");
const { join } = require("node:path");
require("dotenv").config();
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.get("/first", (req, res) => {
  res.sendFile(join(__dirname, "firstChat.html"));
});
app.get("/second", (req, res) => {
  res.sendFile(join(__dirname, "secondChat.html"));
});
io.on("connection", (socket) => {
  console.log("a user is connected!");
  socket.on("chat message", (message) => {
    console.log(`user said: ${message}`);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(process.env.PORT, () => {
  console.log(`listening to PORT ${process.env.PORT}`);
});
