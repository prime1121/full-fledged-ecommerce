import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminleft = () => {
    return (
      <div className="card">
        <h4 className="card-header  bg-dark text-white font-weight-bold">
          Admin Nav
        </h4>
        <ul className="list-group">
          <ul className="list-group-list">
            <Link
              to="/admin/create/category"
              className="nav-link text-success bg-white font-weight-bold"
            >
              Create Category
            </Link>
            <Link
              to="/admin/categories"
              className="nav-link text-success bg-white font-weight-bold"
            >
              Manage Category
            </Link>
          </ul>
          <ul className="list-group-list">
            <Link
              to="/admin/create/product"
              className="nav-link text-success bg-white font-weight-bold"
            >
              Create Product
            </Link>
          </ul>
          <ul className="list-group-list">
            <Link
              to="/admin/manage/product"
              className="nav-link text-success bg-white font-weight-bold"
            >
              Manage Products
            </Link>
          </ul>
          <ul className="list-group-list">
            <Link
              to="/admin/orders"
              className="nav-link text-success bg-white font-weight-bold"
            >
              Manage Orders
            </Link>
          </ul>
        </ul>
      </div>
    );
  };

  const adminright = () => {
    return (
      <div className="card">
        <h4 className="card-header  bg-dark text-white font-weight-bold ">
          Admin Info
        </h4>
        <ul className="list-group">
          <ul className="list-group-list container bg-white p-1 nav-link text-success bg-white font-weight-bold">
            <span class="badge badge-warning">name :</span> {name}
          </ul>
          <ul className="list-group-list container bg-white p-1 nav-link text-success bg-white font-weight-bold">
            <span class="badge badge-warning"> email :</span> {email}
          </ul>
          <ul className="list-group-list container bg-white p-1 nav-link text-success bg-white font-weight-bold">
            <span class="badge badge-warning"> role :</span> {role}
          </ul>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Admin Area"
      description=" manage store"
      className="container bg-success p-1 rounded"
    >
      <div className="row">
        <div className="col-3">{adminleft()}</div>
        <div className="col-9">{adminright()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
