import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from 'dotenv';
import { ProductResolver, UserResolver } from "./resolvers";
import { ProductTypeDefs, UserTypeDefs } from "./typeDefs";
import connectDB from "./db";
import routes from "./routes";
import getUser from "./helpers/jwt";

dotenv.config();

const app = express();
connectDB();

app.use("/business", routes.BusinessRouter);
app.use("/products", routes.ProductsRouter);

const start = async () => {
  const apolloServer = new ApolloServer({
    resolvers: [ProductResolver, UserResolver],
    typeDefs: [ProductTypeDefs, UserTypeDefs],
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';

      // try to retrieve a user with the token
      const user = getUser(token);

      // optionally block the user
      // we could also check user roles/permissions here
      if (!user) throw new Error('you must be logged in');

      // add the user to the context
      return { user };
    },
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
