import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat, gql } from "@apollo/client";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });
const authMiddleware = new ApolloLink(async(operation, forward) => {
  // add the authorization to the headers
  const session = await getSession();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: session?.id ? `Bearer ${session.id}` : null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;