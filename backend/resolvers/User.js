import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/User";

import { privateKey } from '../helpers/key';

const UserResolver = {
  Query: {
    login: async (_, args) => {
      const { username, password } = args;
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('Invalid Credentials!user');
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials!password");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, privateKey, {
          algorithm: "RS256",
        });
        return {
          token,
          userId: user.id,
        };
      } catch (error) {
        return error;
      }
    },
    users: async () => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const newUser = new User(args.userInput);
      const user = await newUser.save();
      return user;
    },
  },
};

export default UserResolver;
