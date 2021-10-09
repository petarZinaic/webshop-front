import { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {

    const { user, token } = isAuthenticated();

    return (
        <Layout
            title="Add a new product"
            description={`G day ${user.name}, ready to add a new category`}
        >
        <div className="row">
          <div className="col-8 offset-md-2">
             ...
            </div>
        </div>
       </Layout>
    )
}

export default AddProduct;