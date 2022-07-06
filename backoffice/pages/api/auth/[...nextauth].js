import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import client from "../../../apollo-client";
import { gql } from "@apollo/client";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })

      
        console.log("credentials", credentials);

        const QUERY = gql`
          query Login($username: String!, $password: String!) {
            login(username: $username password: $password) {
              token
              userId
            }
          }
        `;
        const res = await client.query({
            query: QUERY,
            variables: { username: credentials.username, password: credentials.password },
            errorPolicy: "all",
        });
        // If no error and we have user data, return it
        if (res.data) {
          return res.data.login;
        }
        // Return null if user data could not be retrieved
        // return null
      }
    })
  ],
  callbacks: {
    jwt: ({token, user}) => {
      if(user) {
        token.id = user.token
      }
      return token;
    },
    session: ({ session, token }) => {
      if(token) {
        session.id = token.id
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
})