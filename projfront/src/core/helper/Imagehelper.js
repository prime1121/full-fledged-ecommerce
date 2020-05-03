import React from "react";
import { API } from "../../backend";

const Imagehelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://img.thesouledstore.com/public/theSoul/uploads/catalog/product/20200224185921-1.jpg`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "50%", maxWidth: "50%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default Imagehelper;
