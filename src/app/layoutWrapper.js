"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/statemanagement/appStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayoutWrapper({ children }) {
  const isLoggedIn = useSelector((state) => state?.appReducer.isLoggedIn)
  return (<>
    <Header />
    {isLoggedIn && <Menu />}
    {children}
    <Footer />

  </>
  );
}
