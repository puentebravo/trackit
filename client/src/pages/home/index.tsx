import { useState } from "react";
import BrandBar from "../../components/brandBar";
import { useFormik } from "formik"
import { workoutObject, AuthContextType } from "../../@types/client";
import { useAuthContext } from "../../utils/AuthContext";
import "./home.css"
import ProgressBar from "../../components/progressBar";

function Home() {
    const [workout, setWorkout] = useState<workoutObject>({
        workout: "",
        length: ""
    })



    const { loggedIn } = useAuthContext() as AuthContextType

    const [loading, setLoading] = useState<Boolean>(false)

    const [submitted, setSubmitted] = useState<Boolean>(false)

    const userId = loggedIn.userId

    // resets page state, bringing user back to workout input form

    const handleReset = () => {
        setWorkout({
            workout: "",
            length: ""
        })
        setLoading(false)
        setSubmitted(false)
    }
    // saves completed workout with user ID
    const handleSubmit = () => {
        fetch("/api/rep", {
            method: "POST",
            body: JSON.stringify({ ...workout, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            handleReset()
        })
    }

    // intializes formik object - in this case, for inputting the desired length of the workout to be generated.
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
                <h3 id="repsHeader">{`Your workout is... \n ${workout.workout}`}</h3>
                <button type="button" className="submitBtn" onClick={handleSubmit}>I did it!</button>
                <button type="button" className="submitBtn" onClick={handleReset}> Give me another </button>
            </section>

        </>
    )
}

export default Home;