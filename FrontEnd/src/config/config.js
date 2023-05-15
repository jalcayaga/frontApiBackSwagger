import { config } from 'dotenv';
config();


export const appConfig = {
  PORT: process.env.PORT || 8080,
  APPID: process.env.APPID || '',
};

export const secret = {
  SECRET_KEY: process.env.SECRET_KEY || 'key1234',
}
