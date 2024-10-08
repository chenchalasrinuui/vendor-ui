"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/statemanagement/appStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
import RootLayoutWrapper from "./layoutWrapper";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <RootLayoutWrapper>
            {children}
          </RootLayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
