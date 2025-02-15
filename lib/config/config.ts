import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_SECRET_KEY: process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URI as string,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST as string,
  JWT_SECRET: process.env.JWT_SECRET
};