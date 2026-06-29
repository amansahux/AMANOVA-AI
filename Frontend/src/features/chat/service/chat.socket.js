import { io } from "socket.io-client";

export const initializedSocketConnection = () => {
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to Socket.IO Server " + socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO Server " + socket.id);
  });

};
