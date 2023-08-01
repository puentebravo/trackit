import React from "react";
import BrandBar from "../../components/brandBar";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import "./login.css"

function Login() {

    const navigate = useNavigate()

    // Initialize formik component, set login call to run on submit

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: (values) => {
          
            fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then( response => {
                
                if (response.status === 200) {
                    navigate("/home")
                } else {
                    navigate("/login")
                }

            })
        }
    })


    return (
        <>
            <BrandBar />
            <section id="loginContainer">
                <form id="loginForm" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="loginField"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="loginField"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="password"
                    />
                    <button type="submit" id="loginBtn">Sign in</button>

                </form>
            </section>
        </>
    )
}

export default Login