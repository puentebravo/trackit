import React, { useState } from "react";
import BrandBar from "../../components/brandBar";
import { useFormik } from "formik"
import { workoutObject, AuthContextType } from "../../@types/client";
import { useAuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import "./home.css"
import ProgressBar from "../../components/progressBar";

function Home() {
    const [workout, setWorkout] = useState<workoutObject>({
        workout: "",
        length: ""
    })

    const navigate = useNavigate()

    const { loggedIn } = useAuthContext() as AuthContextType

    const [loading, setLoading] = useState<Boolean>(false)

    const [submitted, setSubmitted] = useState<Boolean>(false)

    // const repForm = useFormik({
    //     initialValues: {
    //         reps: ""
    //     },
    //     onSubmit: (values) => {
    //         console.log(values)
    //         fetch("/api/rep", {
    //             method: "POST",
    //             body: JSON.stringify({...workout, values}),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(response => {
    //             console.log(response)

    //         })
    //     }
    // })

    const userId = loggedIn.userId

    const handleSubmit = () => {
        fetch("/api/rep", {
            method: "POST",
            body: JSON.stringify({ ...workout, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then( response => {
            return response.json()
        }).then(data => {
            console.log(data)
            navigate("/home")
        })



    }

    const minForm = useFormik({
        initialValues: {
            minutes: ""
        },
        onSubmit: ({ minutes }) => {

            setLoading(true)
            setSubmitted(true)
            fetch(`/api/workout/${minutes}`)
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    setWorkout({
                        workout: data.workout,
                        length: minutes
                    })

                    console.log(data)

                })
        }
    })






    return (
        <>
            <BrandBar />

            <section className={submitted ? "formContainer hidden" : "formContainer"}>
                <h3 id="minHeader">How much time do you have?</h3>
                <form id="repsForm" onSubmit={minForm.handleSubmit}>
                    <input
                        type="text"
                        name="minutes"
                        id="minutes"
                        className="formField"
                        onChange={minForm.handleChange}
                        value={minForm.values.minutes}
                        placeholder="Tell us how many minutes you have - we'll do the rest"
                    />
                    <button type="submit" className="submitBtn">Give me a workout!</button>

                </form>
            </section>

            <section className={loading ? "loadSection" : "loadSection hidden"}>
                <h3 id="loadHeader">Creating your custom workout - get psyched!</h3>
                <ProgressBar />
            </section>

            <section className={workout.workout ? "formContainer" : "formContainer hidden"}>
                <h3 id="repsHeader">{`Do ${workout.workout}`}</h3>
                {/* <form id="repsForm" onSubmit={repForm.handleSubmit}>
                        <input
                            type="text"
                            name="reps"
                            id="reps"
                            className="formField"
                            onChange={repForm.handleChange}
                            value={repForm.values.reps}
                            placeholder="How many did you do?"
                        /> */}
                <button type="button" className="submitBtn" onClick={handleSubmit}>I did it!</button>

                {/* </form> */}
            </section>

        </>
    )
}

export default Home;