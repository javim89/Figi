import pkg from 'mongoose';
import { ProductSchema } from "./Product";

const { Schema, model } = pkg;

export const OrderSchema = new Schema({
  products: [ProductSchema],
  total: Number,
  table: Number,
  status: {
    type: String,
    enum: {
      values: ["pending", "processing", "ready_to_deliver", "completed"],
    },
  },
});

export default model("order", OrderSchema);
