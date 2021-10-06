import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
const Signin = () => {

    const [ values, setValues ] = useState({
        email: "marko@gmail.com",
        password: "petar123",
        loading: "",
        redirectToReferrer: false
    });

    const {  email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handeChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

   

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({ email, password })
        .then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, loading: false })
            } else {
               authenticate(
                   data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                })
            }
        })
    }

    const signInForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted"> Email</label>
                    <input
                        onChange={handeChange("email")}
                        type="email"
                        className="form-control"
                        value={email}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted"> Password</label>
                    <input
                        onChange={handeChange("password")}
                        type="password"
                        className="form-control"
                        value={password}
                    />
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    }

    const showError = () =>  (
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                {error}
            </div>
        )
    

    const showLoading = () => (
           loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>)
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1) {
                return <Redirect to="admin/dashboard" />;
            }
            else {
                return <Redirect to="user/dashboard" />
            }
        }
    }
    

    return(
        <Layout 
            title="Sigin"
            description="Signin to React E-commperce App"
            className="container col-md-8 offset-md-2"
            >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;