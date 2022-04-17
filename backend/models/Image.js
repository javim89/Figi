import pkg from 'mongoose';

const { Schema, model } = pkg;

export const ImageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default model("image", ImageSchema);
