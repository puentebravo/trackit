import React from "react";
import BrandBar from "../../components/brandBar";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContextType } from "../../@types/client";
import { useAuthContext } from "../../utils/AuthContext";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const { saveAuth } = useAuthContext() as AuthContextType
  // Initialize formik component, set signup call to run on submit

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("/api/signup/local", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        // If Response is good, login user
        if (response.ok) {

          fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username: values.username, password: values.password }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            return response.json()
          }).then(data => {
            if (data) {
              saveAuth(data.user)
              navigate("/home")
            }
          })
        }
      })
    },
  });

  return (
    <>
      <BrandBar />
      <section id="signUpContainer">
        <form id="signUpForm" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            className="signUpField"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="signUpField"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
          />
          <input
            type="text"
            name="name"
            id="name"
            className="signUpField"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
          />
          <button type="submit" id="signUpBtn">
            Sign Up
          </button>
        </form>
        <button type="button" id="loginBtn">
          <Link to="/login">
            Back to Login
          </Link>
        </button>
      </section>
    </>
  );
}

export default Signup;
