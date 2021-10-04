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

    const { name, email, password } = values;

    const handeChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signup = (user) => {
        console.log(name, email, password)
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({ name, email, password });
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
                <button onClick={clickSubmit} className="btn btn-primary">
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