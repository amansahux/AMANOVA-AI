// import config from "../config/config.js";
// import { Server } from "socket.io";

// let io;
// export function initSocket(httpServer) {
//   io = new Server(httpServer, {
//     cors: {
//       origin: config.base_url,
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("New Connection Established " + socket.id);

//     socket.on("disconnect", () => {
//       console.log(`User Disconnected: ${socket.id}`);
//     });
//   });
// }

// console.log("Socket Server is RUNNING");

// export function GetIO() {
//   if (!io) {
//     throw new Error("Socket.IO not initialized");
//   }
//   return io;
// }
