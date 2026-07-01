import app from "./src/app.js";
import config from "./src/config/config.js";
import connectToDb from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = http.createServer(app);

initSocket(httpServer)

connectToDb();

httpServer.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
