import pkg from "mongoose";
import bcrypt from "bcrypt";
import { ProductSchema } from "./Product";
import { BusinessSchema } from "./Business";

const { Schema, model } = pkg;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: {
    type: [ProductSchema],
  },
  bussines: {
    type: BusinessSchema,
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

export default model("user", UserSchema);
