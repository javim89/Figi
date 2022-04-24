import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

import { publicKey } from './key';

dotenv.config();

// const verifyToken = async (req, res, next) => {
//   const authToken = req.get('Authorization');
//   if (!authToken) {
//     req.isAuth = false;
//     return next();
//   }
//   const token = authToken.split(' ')[1];
//   let verify;
//   try {
//     verify = jwt.verify(token, publicKey);
//   } catch (error) {
//     req.isAuth = false;
//     return next();
//   }
//   if (!verify.id) {
//     req.isAuth = false;
//     return next();
//   }
//   const user = await User.findById(verify.id);
//   if (!user) {
//     req.isAuth = false;
//     return next();
//   }
//   req.userId = user.id;
//   req.isAuth = true;
//   next();
// };

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
};

export default getUser;
