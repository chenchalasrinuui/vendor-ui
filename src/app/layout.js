"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import './animations.css'
import "bootstrap/dist/css/bootstrap.css"
import { Provider, useSelector } from "react-redux";
import { store } from "@/statemanagement/appStore";
import RootLayoutWrapper from "./layoutWrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const uploadLink = createUploadLink({
    uri: 'http://localhost:2020/graphql', // Replace with your GraphQL server URL
  });
  const client = new ApolloClient({
    link: uploadLink,
    uri: 'http://localhost:2020/graphql',
    cache: new InMemoryCache()
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <RootLayoutWrapper>
              {children}
            </RootLayoutWrapper>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}
