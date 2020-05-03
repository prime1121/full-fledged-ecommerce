import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getallcategory, deleteCategory } from "./helper/adminapicall";

const Managecategories = () => {
  const [cat, setCat] = useState([]);
  const { user, token } = isAutheticated();

  const preload = () => {
    getallcategory().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCat(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deletecat = (productId) => {
    deleteCategory(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  const goback = () => (
    <div className="mt-5">
      <Link
        className="btn btn-sm btn-success mb-3 rounded"
        to="/admin/dashboard"
      >
        Admin home
      </Link>
    </div>
  );
  return (
    <Base
      className="container bg-success p-4 rounded"
      title="Categories section"
      description=" add here"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <h2 className="mb-4">All Categories:</h2>
          <div className="row">
            <div className="col-12">
              {cat.map((cat, index) => {
                return (
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-grey text-left">{cat.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success rounded"
                        to={`/admin/category/update/${cat._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => {
                          deletecat(cat._id);
                        }}
                        className="btn btn-danger rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {goback()}
        </div>
      </div>
    </Base>
  );
};
export default Managecategories;
