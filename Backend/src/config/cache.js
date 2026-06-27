import Redis from "ioredis";
import config from "./config.js";

const redis = new Redis({
  host: config.redis_host,
  port: config.redis_port,
  password: config.redis_password,
});

redis.on("connect", () => {
  console.log("Server connected to redis");
});
redis.on("error", (err) => {
  console.error(err.message);
});

export default redis;
