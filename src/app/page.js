"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { Login } from "@/components/Login";
import { Home } from "@/components/Home";

export default function HomePage() {

  const isLoggedIn = useSelector((state) => state?.appReducer?.isLoggedIn)
  return (
    <div>
      {isLoggedIn ? <Home /> : <Login />}
    </div>
  );
}
