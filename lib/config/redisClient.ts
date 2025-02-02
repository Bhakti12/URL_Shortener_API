import Redis from "ioredis";
import { config } from "./config";

const redisClient = new Redis({
  host: config.REDIS_HOST || "127.0.0.1",
  port: 6379
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

export default redisClient;
