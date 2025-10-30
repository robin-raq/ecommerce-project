import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, fetchCartData }) {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/products").then((response) => {
  //     // console.log(response);
  //     setProducts(response.data);
  //   });
  // }, []);
  // replace the above code with async await but cant return a promise inside of useEffect
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);
  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} fetchCartData={fetchCartData} />
      </div>
    </>
  );
}
