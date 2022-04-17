import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import connectDB from "./db";
import routes from "./routes";

const app = express();
connectDB();

app.use("/business", routes.BusinessRouter);
app.use("/products", routes.ProductsRouter);

const start = async () => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.use("*", (req, res) => res.status(400).send("Not found"));
  app.listen(3001, () => {
    console.log("Server on port", 3001);
  });
};

start();

export default app;
