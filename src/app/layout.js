"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import './animations.css'
import "bootstrap/dist/css/bootstrap.css"
import { Provider, useSelector } from "react-redux";
import { store } from "@/statemanagement/appStore";
import RootLayoutWrapper from "./layoutWrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const client = new ApolloClient({
    uri: "http://localhost:2020/graphql",
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
