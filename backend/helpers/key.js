import dotenv from 'dotenv';

dotenv.config();

export const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString('ascii');
export const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString('ascii');
