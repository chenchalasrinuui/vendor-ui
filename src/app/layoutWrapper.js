"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useSelector } from "react-redux";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
import { Loader } from "@/components/shared/Loader";
import { Toaster } from "@/components/shared/Toaster";
import { Modal } from "@/components/shared/Modal";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayoutWrapper({ children }) {

  const isLoggedIn = useSelector((state) => state?.appReducer?.isLoggedIn)
  const isShowLoader = useSelector((state) => state?.appReducer?.isShowLoader)
  const isShowToaster = useSelector((state) => state?.appReducer?.toaster?.isShowToaster)
  const isShowModal = useSelector((state) => state?.appReducer?.modal?.isShowModal)

  return (<>
    <Header />
    {isLoggedIn && <Menu />}
    {children}
    {isShowLoader && <Loader />}
    {isShowToaster && <Toaster />}
    {isShowModal && <Modal ></Modal>}
    <Footer />

  </>
  );
}
