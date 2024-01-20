import { useState } from "react";
import BrandBar from "../../components/brandBar";
import { workoutObject, AuthContextType } from "../../@types/client";
// import { useAuthContext } from "../../utils/AuthContext";
import "./home.css"
import ProgressBar from "../../components/progressBar";
import MinCounter from "../../components/minCounter";
import SetTimer from "../../components/setTimer";
import CountBanner from "../../components/countBanner";
import { useFormik } from "formik";

function Home() {
    const [workout, setWorkout] = useState<workoutObject>({
        workout: "",
        length: "",
        instructions: [""]
    })



    // const { loggedIn } = useAuthContext() as AuthContextType

    const [loading, setLoading] = useState<Boolean>(false)

    const [sweating, setSweating] = useState<Boolean>(false)

    const [minutes, setMinutes] = useState<number>(0)

    const [totalMinutes, setTotalMinutes] = useState<number>(0)

    const [submitted, setSubmitted] = useState<Boolean>(false)

    // const userId = loggedIn.userId

    // resets page state, bringing user back to workout input form

    const handleReset = () => {
        setWorkout({
            workout: "",
            length: "",
            instructions: [""]
        })
        setTotalMinutes(totalMinutes + minutes)
        setLoading(false)
        setSubmitted(false)
        setSweating(false)
    }

    const formik = useFormik({
        initialValues: {
            reps: ""
        },
        onSubmit: (values) => {

            let workoutObj = {
                workout: workout.workout,
                length: workout.length,
                reps: values.reps
            }
            fetch("/api/rep", {
                method: "POST",
                body: JSON.stringify(workoutObj),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    handleReset()
                } else {
                    console.error(response)
                }
            })
        }
    })

    const handleSweatin = () => {
        setSweating(true)
    }


    const handleTimeSelect = async (time: string) => {
        setLoading(true);
        setSubmitted(true)
        setMinutes(parseInt(time))
        try {
            const response = await fetch(`/api/workout/${time}`)
            const prompt = await response.json();

            let cleanedStr = prompt.instructions.replace(/\n/g, "")
            let cleanedArr = cleanedStr.split(/\d\./g)
            cleanedArr.shift()
            setWorkout({
                workout: prompt.workout,
                length: time,
                instructions: cleanedArr
            })

            setLoading(false)

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

            {
                totalMinutes > 0 && !submitted ?
                    <section>
                        <MinCounter minutes={totalMinutes} />
                    </section>

                    :
                    <></>
            }

            {

                !submitted ?
                    <section id="timeContainer" className="formContainer">
                        <h3 id="minHeader">How much time do you have?</h3>

                        <button className="timeSelect" onClick={function () {
                            handleTimeSelect("5")
                        }}>5 Minutes</button>
                        <button className="timeSelect" onClick={function () {
                            handleTimeSelect("10")
                        }}>10 Minutes</button>
                        <button className="timeSelect" onClick={function () {
                            handleTimeSelect("15")
                        }}>15 Minutes</button>
                        <button className="timeSelect" onClick={sendToGoogle}>I should probably just hit the gym</button>

                    </section>

                    :
                    <></>
            }


            <section className={loading ? "loadSection" : "loadSection hidden"}>
                <h3 id="loadHeader">Creating your custom workout - get psyched!</h3>
                <ProgressBar />
            </section>

            {
                workout.workout && !sweating ?
                    <section className="formContainer">
                        <h2 className="text-bubble" id="doHeader">Do</h2>
                        <h3 id="repsHeader">{`${workout.workout}`}</h3>
                        <ol className="exercise-list">
                            {
                                workout.instructions.map(element => (
                                    <li className="list-item">{element}</li>
                                ))
                            }

                        </ol>
                        <SetTimer minutes={minutes} />
                        <button type="button" className="timeSelect" id="sweatnBtn" onClick={handleSweatin}> I'm Sweatin' </button>
                    </section>

                    :
                    <></>

            }

            {
                sweating ?
                    <section className="formContainer">
                        <CountBanner />
                        <form onSubmit={formik.handleSubmit} id="repsForm">
                            <input
                                type="text"
                                name="reps"
                                id="reps"
                                className="formField"
                                onChange={formik.handleChange}
                                value={formik.values.reps}
                                placeholder="So many"
                            />

                            <button type="submit" className="timeSelect" id="doneBtn"> Done </button>
                        </form>
                    </section>
                    :
                    <></>
            }

        </>
    )
}

export default Home;