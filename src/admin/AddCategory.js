import { useState } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";

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
                />
            </div>
                <button className="btn btn-outline-primary">
                    Create Category
                </button>
        </form>
    )

    return (
        <Layout
            title="Add a new cateogry"
            description={`G day ${name}, ready to add a new category`}
        >
        <div className="row">
          <div className="col-8 offset-md-2">{newCategoryForm()}</div>
        </div>
       </Layout>
    )
   
}

export default AddCategory;