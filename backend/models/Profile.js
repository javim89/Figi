import pkg from 'mongoose';
import { ImageSchema } from "./Image";

const { Schema, model } = pkg;

export const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  image: ImageSchema,
});

export default model("profile", ProfileSchema);
