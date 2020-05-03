import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4 rounded",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid font-weight-bold rounded">
      <div className="jumbotron-md bg-dark text-white text-center rounded">
        <h2 className="display-4 font-weight-bold rounded">{title}</h2>
        <p className="lead font-weight-bold ">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <div class="footer bg-success text-left font-weight-bold">
      <span>
        An Amazing <span className="badge badge-warning">Shop</span> Store
      </span>
    </div>
  </div>
);

export default Base;
