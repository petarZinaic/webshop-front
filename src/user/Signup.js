import { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../config";

const Signup = () => {

    const [ values, setValues ] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        sucess: false
    });

    const handeChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted"> Name</label>
                    <input onChange={handeChange("name")} type="text" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label className="text-muted"> Email</label>
                    <input onChange={handeChange("email")} type="email" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label className="text-muted"> Password</label>
                    <input onChange={handeChange("password")} type="password" className="form-control"></input>
                </div>
                <button className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    }

    return(
        <Layout 
            title="Signup"
            description="Signup to React E-commperce App"
            className="container col-md-8 offset-md-2"
            >
           {signUpForm()}
           {JSON.stringify(values)}
        </Layout>
    )
}

export default Signup;