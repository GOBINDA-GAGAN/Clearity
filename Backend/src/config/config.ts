import dotenv from 'dotenv';
import ms from 'ms';
dotenv.config();

interface Config {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ACCESS_TOKEN_EXP: number;
  REFRESH_TOKEN_EXP: number;
  CLIENT_URL: string;
  ADMIN_EMAIL: string;
  defaultResLimit: Number
  defaultResOffset: Number
}

export const config = {
  PORT: Number(process.env.PORT!),
  NODE_ENV: process.env.NODE_ENV!,
  MONGO_URI: process.env.MONGO_URI!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_TOKEN_EXP: ms(process.env.ACCESS_TOKEN_EXP as ms.StringValue),
  REFRESH_TOKEN_EXP: ms(process.env.REFRESH_TOKEN_EXP as ms.StringValue),
  CLIENT_URL: process.env.CLIENT_URL!,
  ADMIN_EMAIL: process.env.ADMIN_Email!,
  Cloudinary_Name: process.env.Cloudinary_Name,
  Cloudinary_API_Key: process.env.Cloudinary_API_Key,
  Cloudinary_API_Secret: process.env.Cloudinary_API_Secret,
  defaultResLimit: 20,
  defaultResOffset: 0
};

export default config;