import jwt from "jsonwebtoken";
import config from "../config/config.js";
import redis from "../config/cache.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const isBlacklisted = await redis.get(`${token}`);
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is blacklisted" });
    }

    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
