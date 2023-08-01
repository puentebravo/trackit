import React, { useEffect, useState } from "react";
import BrandBar from "../../components/brandBar";
import { useFormik } from "formik"
import "./home.css"

function Home() {

    const formik = useFormik({
        initialValues: {
            reps: ""
        },
        onSubmit: (values) => {
            console.log(values)
            fetch("/api/rep", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                console.log(response)

            })
        }
    })

    const [workout, setWorkout] = useState<String>("")

    useEffect(() => {
        fetch("/api/workout").then(response => response.json()).then(data => {
            setWorkout(data.workout)
        })
    }, [])

    return (
        <>
            <BrandBar />

            <h1 id="repsHeader">{`Do ${workout}`}</h1>
            <section id="formContainer">
                <form id="repsForm" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="reps"
                        id="reps"
                        className="formField"
                        onChange={formik.handleChange}
                        value={formik.values.reps}
                        placeholder="How many did you do?"
                    />
                    <button type="submit" id="submitBtn">Send it</button>

                </form>
            </section>

        </>
    )
}

export default Home;