import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat, gql } from "@apollo/client";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });
const authMiddleware = new ApolloLink(async(operation, forward) => {
  // add the authorization to the headers
  const session = await getSession();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: session?.id || null,
    }
  }));

  return forward(operation);
})

// const ProductTypeDefs = gql`
//     type Product {
//         id: ID,
//         name: String,
//         description: String
//         category: [String],
//         price: Float,
//         isVegetarian: Boolean,
//         isVegan: Boolean,
//         nutricionInfo: Boolean,
//         fat: Int,
//         saturates: Int,
//         salt: Int,
//         sugars: Int
//     }
//     type Query {
//         getAll: [Product],
//         getProduct(id: String): Product,
//     }
//     input ProductInput {
//         name: String,
//         description: String
//         category: [String],
//         price: Float,
//         isVegetarian: Boolean,
//         isVegan: Boolean,
//         nutricionInfo: Boolean,
//         fat: Int,
//         saturates: Int,
//         salt: Int,
//         sugars: Int
//     }
//     type Mutation {
//         createProduct(product: ProductInput): Product,
//         deleteProduct(id: ID): String,
//         updateProduct(id: ID, product: ProductInput): Product
//     }
// `;

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  // typeDefs: ProductTypeDefs
});

export default client;