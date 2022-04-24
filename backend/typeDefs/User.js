import { gql } from "apollo-server-express";

const UserTypeDefs = gql`
    type User {
        id:ID!
        username:String!
        email:String!
        password:String!
    }
    input UserInput{
        username:String!
        email:String!
        password:String!
    }
    type Mutation{
        createUser(userInput:UserInput!):User!
    }
    type LoginReturnType{
        token:String
        userId:ID
    }
    type Query{
        users:[User]
        login(username:String!,password:String!):LoginReturnType!
    }
`;

export default UserTypeDefs;
