import jwt from "jsonwebtoken";

export const generateToken = (userId, email, expiresIn = "24h") => {
    return jwt.sign({ id: userId, email: email }, config.jwt_secret, {
        expiresIn,
    });
};