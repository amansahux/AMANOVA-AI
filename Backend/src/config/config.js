import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.PORT
  //   !process.env.MONGO_URI ||
  //   !process.env.JWT_SECRET ||
  //   !process.env.GOOGLE_CLIENT_ID ||
  //   !process.env.GOOGLE_CLIENT_SECRET ||
  //   !process.env.GOOGLE_REFRESH_TOKEN ||
  //   !process.env.GOOGLE_USER_ID
) {
  console.error("Missing required environment variables");
  process.exit(1);
}
const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  imagekit_private_key: process.env.IMAGEKIT_PRIVATE_KEY,
  razorpay_key_id: process.env.RAZORPAY_KEY_ID,
  razorpay_key_secret: process.env.RAZORPAY_KEY_SECRET,
  google_refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  google_user_id: process.env.GOOGLE_USER_ID,
};
export default config;
