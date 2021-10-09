import { useState } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [sucess, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();


    const handeChange = e => {
        setError("");
        setName(e.target.value);
    }

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true)
            } else {
                setError("")
                setSuccess(true)
            }
            
        })

    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handeChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
                <button className="btn btn-outline-primary">
                    Create Category
                </button>
        </form>
    )

    const showSuccess = () => {
        if(sucess) {
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Category is should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
                </Link>
        </div>
    )
    

    return (
        <Layout
            title="Add a new cateogry"
            description={`G day ${user.name}, ready to add a new category`}
        >
        <div className="row">
          <div className="col-md-8 offset-md-2">
              {showSuccess()}
              {showError()}
              {newCategoryForm()}
              {goBack()}
            </div>
        </div>
       </Layout>
    )
   
}

export default AddCategory;