import { config } from 'dotenv';
config();

export const SECRET_KEY = 'key1234';

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

export const appConfig = {
  PORT: process.env.PORT || 7000,
  APPID: process.env.APPID || '',
};
