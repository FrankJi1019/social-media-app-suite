import * as dotenv from 'dotenv';

dotenv.config();

export const constants = {
  auth: {
    AUTHENTICATION_ISSUER_URL: process.env.AUTHENTICATION_ISSUER_URL as string,
  },
  database: {
    TYPE: process.env.DB_TYPE,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DBNAME: process.env.DB_NAME,
  },
};
