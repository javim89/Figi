import pkg from 'mongoose';

const { Schema, model } = pkg;

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  description: String,
  price: Number,
  url_image: String,
});

export default model("product", ProductSchema);
