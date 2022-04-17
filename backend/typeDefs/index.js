import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Product {
        id: ID,
        name: String,
        description: String,
    }
    type Query {
        getAll: [Product],
        getProduct(id: String): Product,
    }
    input ProductInput {
        name: String,
        description: String
    }
    type Mutation {
        create(product: ProductInput): Product,
        deleteProduct(id: ID): String,
        updateProduct(id: ID, product: ProductInput): Product
    }
`;

export default typeDefs;
