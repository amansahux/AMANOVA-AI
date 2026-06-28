import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.PORT ||
  !process.env.MONGO_URI ||
  !process.env.JWT_SECRET ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.GOOGLE_REFRESH_TOKEN ||
  !process.env.GOOGLE_USER_ID ||
  !process.env.BASE_URL ||
  !process.env.REDIS_HOST ||
  !process.env.REDIS_PORT ||
  !process.env.REDIS_PASSWORD ||
  !process.env.GEMINI_API_KEY ||
  !process.env.MISTRAL_API_KEY ||
  !process.env.GROQ_API_KEY ||
  !process.env.OPENROUTER_API_KEY ||
  !process.env.COHERE_API_KEY ||
  !process.env.CEREBRAS_API_KEY ||
  !process.env.NVIDIA_API_KEY
) {
  console.error("Missing required environment variables");
  process.exit(1);
}
const config = {
  port: process.env.PORT,
  base_url: process.env.BASE_URL,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  google_user_id: process.env.GOOGLE_USER_ID,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_password: process.env.REDIS_PASSWORD,
  gemini_api_key: process.env.GEMINI_API_KEY,
  mistral_api_key: process.env.MISTRAL_API_KEY,
  groq_api_key: process.env.GROQ_API_KEY,
  openrouter_api_key: process.env.OPENROUTER_API_KEY,
  cohere_api_key: process.env.COHERE_API_KEY,
  cerebras_api_key: process.env.CEREBRAS_API_KEY,
  nvidia_api_key: process.env.NVIDIA_API_KEY,
};
export default config;
