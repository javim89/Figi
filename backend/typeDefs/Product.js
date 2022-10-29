import { gql } from "apollo-server-express";

const ProductTypeDefs = gql`
    type Product {
        id: ID,
        name: String,
        description: String
        category: [String],
        price: Float,
        isVegetarian: Boolean,
        isVegan: Boolean,
        nutricionInfo: Boolean,
        fat: Int,
        saturates: Int,
        salt: Int,
        sugars: Int
    }
    type Query {
        getAll: [Product],
        getProduct(id: String): Product,
    }
    input ProductInput {
        name: String,
        description: String
        category: [String],
        price: Float,
        isVegetarian: Boolean,
        isVegan: Boolean,
        nutricionInfo: Boolean,
        fat: Int,
        saturates: Int,
        salt: Int,
        sugars: Int
    }
    type Mutation {
        createProduct(product: ProductInput): Product,
        deleteProduct(id: ID): String,
        updateProduct(id: ID, product: ProductInput): Product
    }
`;

export default ProductTypeDefs;
