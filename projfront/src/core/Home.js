import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import getallproduct from "./helper/Coreapicalls";

export default function Home() {
  console.log("API IS", API);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllprod = () => {
    getallproduct().then((data) => {

      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllprod()
  },[])

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All tshirt</h1>
        <div className="row">
          {products.map((product,index) => {
            return (
              <div key={index}className="col-4 mg-4">
                <Card product={product}/>
              </div>
            )
          })}</div>
      </div>
    </Base>
  );
}
