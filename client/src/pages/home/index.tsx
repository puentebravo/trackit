import React, { useState } from "react";
import BrandBar from "../../components/brandBar";
import { useFormik } from "formik"
import "./home.css"

function Home() {
    const [workout, setWorkout] = useState<String>("")

    const repForm = useFormik({
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

    const minForm = useFormik({
        initialValues: {
            minutes: ""
        },
        onSubmit: (values) => {
            fetch(`/api/workout/${values.minutes}`)
                .then(response => response.json())
                .then(data => {
                    setWorkout(data.workout)
                })
        }
    })






    return (
        <>
            <BrandBar />

            <section id="minFormContainer">
                <h3 id="minHeader">How much time do you have?</h3>
                <form id="repsForm" onSubmit={minForm.handleSubmit}>
                    <input
                        type="text"
                        name="minutes"
                        id="minutes"
                        className="formField"
                        onChange={minForm.handleChange}
                        value={minForm.values.minutes}
                        placeholder="I have this many minutes to workout"
                    />
                    <button type="submit" id="minuteBtn">Give me a workout!</button>

                </form>
            </section>

            <section id="formContainer">
                <h3 id="repsHeader">{`Do ${workout}`}</h3>
                <form id="repsForm" onSubmit={repForm.handleSubmit}>
                    <input
                        type="text"
                        name="reps"
                        id="reps"
                        className="formField"
                        onChange={repForm.handleChange}
                        value={repForm.values.reps}
                        placeholder="How many did you do?"
                    />
                    <button type="submit" id="submitBtn">Send it</button>

                </form>
            </section>

        </>
    )
}

export default Home;