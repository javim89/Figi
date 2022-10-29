import pkg from 'mongoose';
import { ImageSchema } from "./Image";

const { Schema, model } = pkg;

export const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  image: {
    type: ImageSchema,
    required: false,
  },
});

export default model("profile", ProfileSchema);
