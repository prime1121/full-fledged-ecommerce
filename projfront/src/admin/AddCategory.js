import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

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
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backedn request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success font-weight-bold">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success font-weight-bold">Failed to create category</h4>;
    }
  };

  const mycategory = () => (
    <form>
      <div className="form-group">
        <p className="lead">enter the catergory</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="for ex.Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-success rounded">
          create category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create Category"
      description="Adding new category for store"
      className="container bg-success p-4 rounded"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {mycategory()}
          {goback()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
