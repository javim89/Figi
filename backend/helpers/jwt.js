import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { publicKey } from './key';

dotenv.config();

const getUser = async (token) => {
  if (token) {
    try {
      const res = await jwt.verify(token.split(" ")[1], publicKey);
      console.log("@res ", res);
      return res;
    } catch (error) {
      console.log("@error ", error);
      throw new Error("Your session has ended. Please sign in again");
    }
  }
  return false;
};

export default getUser;
