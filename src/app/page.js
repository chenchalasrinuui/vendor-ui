"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { SAVE_PRODUCT } from "@/graphql/mutations/saveProduct";
import { GET_PRODUCTS } from "@/graphql/queries/getProducts";
export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  const [getProducts, { loading: productLoading, data: prodctsData, error: productsError }] = useLazyQuery(GET_PRODUCTS)
  const [saveProduct] = useMutation(SAVE_PRODUCT)
  console.log(11, data)
  const handleGetProducts = () => {
    console.log("called")
    getProducts()
  }

  const hanldeSaveProduct = async () => {
    debugger;
    const res = await saveProduct({
      variables: {
        "productInput": {
          "name": "s3",
          "cost": 3333,
          "category": "",
          "description": ""
        }
      }
    })
    debugger;
  }
  return (
    <div>
      <h1>Onload : {loading && <span>Loading name...</span>} {data?.getProducts?.[0]?.name}</h1>
      <button onClick={handleGetProducts}>Get Products</button>
      <h1>on button click : {productLoading && <span>Loading 2nd name...</span>} {prodctsData?.getProducts?.[1]?.name}</h1>
      <button onClick={hanldeSaveProduct}>Save Products</button>

    </div>
  );
}
