import * as React from 'react';
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo-client";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )

}

export default MyApp
