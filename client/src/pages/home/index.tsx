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
        length: "",
        instructions: ""
    })



    const { loggedIn } = useAuthContext() as AuthContextType

    const [loading, setLoading] = useState<Boolean>(false)

    const [sweating, setSweating] = useState<Boolean>(false)

    const [submitted, setSubmitted] = useState<Boolean>(false)

    const userId = loggedIn.userId

    // resets page state, bringing user back to workout input form

    const handleReset = () => {
        setWorkout({
            workout: "",
            length: "",
            instructions: ""
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


    const handleTimeSelect = async (time: string) => {
        setLoading(true);
        setSubmitted(true)
        try {
            const response = await fetch(`/api/workout/${time}`)
            const prompt = await response.json();
            setWorkout({
                workout: prompt.workout,
                length: time,
                instructions: prompt.instructions
            })

            if (workout.workout) {
                setLoading(false)
                setSweating(true)
            }


        } catch (error) {
            console.error(error)
        }

    }

    const sendToGoogle = () => {
        window.open("https://www.google.com/search?q=gym+near+me&sca_esv=598988451&source=hp&ei=fSqnZbPABrmnptQPkbOWwAQ&iflsig=ANes7DEAAAAAZac4jbHAYTfsj02PgL54CRhsWbPjsyBE&ved=0ahUKEwjz8s2AoOODAxW5k4kEHZGZBUgQ4dUDCA8&uact=5&oq=gym+near+me&gs_lp=Egdnd3Mtd2l6IgtneW0gbmVhciBtZTIOEAAYgAQYsQMYgwEYyQMyCxAAGIAEGIoFGJIDMgsQABiABBiKBRiSAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIlSlQtw9Y6SRwBHgAkAEAmAFpoAGZBqoBBDEzLjG4AQPIAQD4AQGoAgrCAhAQLhgDGI8BGOUCGOoCGIwDwgIQEAAYAxiPARjlAhjqAhiMA8ICCxAAGIAEGLEDGIMBwgIREC4YgAQYsQMYgwEYxwEY0QPCAgUQLhiABMICCBAuGLEDGIAEwgIIEAAYgAQYsQPCAggQLhiABBixA8ICEBAAGIAEGAoYsQMYgwEYsQPCAgsQLhiABBjHARjRA8ICBxAAGIAEGArCAgsQLhiABBixAxiDAcICDhAuGIAEGMcBGK8BGI4FwgIIEAAYgAQYkgPCAg4QLhiABBiKBRixAxiDAcICCxAuGIAEGMcBGK8B&sclient=gws-wiz", '_blank', 'noopener, noreferrer');

    }



    return (
        <>
            <BrandBar />

            <section className={submitted ? "formContainer hidden" : "formContainer"}>
                <h3 id="minHeader">How much time do you have?</h3>

                <button className="timeSelect" onClick={function () {
                    handleTimeSelect("5 minutes")
                }}>5 Minutes</button>
                <button className="timeSelect" onClick={function () {
                    handleTimeSelect("10 minutes")
                }}>10 Minutes</button>
                <button className="timeSelect" onClick={function () {
                    handleTimeSelect("15 minutes")
                }}>15 Minutes</button>
                <button className="timeSelect" onClick={sendToGoogle}>I should probably just hit the gym</button>

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