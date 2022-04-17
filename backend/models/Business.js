import pkg from 'mongoose';
import { ProfileSchema } from "./Profile";
import { ProductSchema } from "./Product";
import { OrderSchema } from "./Order";

const { Schema, model } = pkg;

const BusinessSchema = new Schema({
  profile: {
    type: ProfileSchema,
    required: false,
  },
  products: {
    type: [ProductSchema],
    required: false,
  },
  orders: {
    type: [OrderSchema],
    required: false,
  },
  category: String,
}, { timestamps: true });

export default model("business", BusinessSchema);
