import React from "react";
import BrandBar from "../../components/brandBar";
import { useFormik } from "formik"
import "./login.css"

function Login() {

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })


    return (
        <>
            <BrandBar />
            <section id="loginContainer">
                <form id="loginForm" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        className="loginField"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
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