import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import connectDB from "./db";
// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const { resolvers } = require("./resolvers");
// const { typeDefs } = require("./typeDefs");
// const { connectDB } = require("./db");

const app = express();
connectDB();

app.get("/", (req, res) => res.send("Welcome to my api"));

const start = async () => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.use("*", (req, res) => res.status(400).send("Not found"));
  app.listen(3000, () => {
    console.log("Server on port", 3000);
  });
};

start();

export default app;
