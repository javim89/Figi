import Product from "../models/Product";

const resolvers = {
  Query: {
    getAll: async () => {
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

export default resolvers;
