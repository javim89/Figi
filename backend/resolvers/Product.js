import Product from "../models/Product";

const ProductResolver = {
  Query: {
    getAll: async (parent, args, context) => {
      const user = await context.user;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const products = await Product.find();
      return products;
    },
    getProduct: async (_, args) => {
      const product = await Product.findById(args.id);
      return product;
    },
  },
  Mutation: {
    create: async (_, args) => {
      const { name, description } = args.product;
      const newProduct = new Product({ name, description });
      await newProduct.save();
      return newProduct;
    },
    deleteProduct: async (_, args) => {
      await Product.findByIdAndDelete(args.id);
      return "product deleted";
    },
    updateProduct: async (_, args) => {
      const product = await Product.findByIdAndUpdate(args.id, {
        $set: args.product,
      }, { new: true });

      return product;
    },
  },
};

export default ProductResolver;
