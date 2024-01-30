import { useState } from "react";
import BrandBar from "../../components/brandBar";
import { workoutObject, AuthContextType, currentWorkoutObject } from "../../@types/client";
// import { useAuthContext } from "../../utils/AuthContext";
import "./home.css"
import ProgressBar from "../../components/progressBar";
import MinCounter from "../../components/minCounter";
import SetTimer from "../../components/setTimer";
import CountBanner from "../../components/countBanner";
import { CallTracker } from "assert";
import CalCounter from "../../components/calCounter";
import WeekTracker from "../../components/weekTracker";
// import { useFormik } from "formik";

function Home() {
    const [workout, setWorkout] = useState<workoutObject>({
        workout: "",
        length: "",
        instructions: [""]
    })

    const [currentWorkout, setCurrentWorkout] = useState<currentWorkoutObject>({
        workout: "",
        instructions: [""]
    })

    // const { loggedIn } = useAuthContext() as AuthContextType

    const [loading, setLoading] = useState<Boolean>(false)

    const [sweating, setSweating] = useState<Boolean>(false)

    const [minutes, setMinutes] = useState<number>(0)

    const [totalMinutes, setTotalMinutes] = useState<number>(0)

    const [numWorkouts, setNumWorkouts] = useState<number>(0)

    const [submitted, setSubmitted] = useState<Boolean>(false)

    const [calories, setCalories] = useState<number>(0)

    const [totalCal, setTotalCal] = useState<number>(0)

    const [reps, setReps] = useState<number>(0)

    // const userId = loggedIn.userId

    // resets page state, bringing user back to workout input form



    const handleReset = () => {
        setWorkout({
            workout: "",
            length: "",
            instructions: [""]
        })
        setCurrentWorkout({
            workout: "",
            instructions: [""]
        })
        setTotalMinutes(totalMinutes + minutes)
        setTotalCal(totalCal + calories)
        setLoading(false)
        setSubmitted(false)
        setSweating(false)
        setReps(0)

    }

    // const formik = useFormik({
    //     initialValues: {
    //         reps: 0
    //     },
    //     onSubmit: (values) => {

    //         let workoutObj = {
    //             workout: workout.workout,
    //             length: workout.length,
    //             reps: values.reps
    //         }
    //         fetch("/api/rep", {
    //             method: "POST",
    //             body: JSON.stringify(workoutObj),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(response => {

    //             if (response.ok) {
    //                 handleReset()
    //             } else {
    //                 console.error(response)
    //             }
    //         })
    //     }
    // })

    const handleSubmit = async () => {
        let workoutObj = {
            workout: workout.workout,
            length: workout.length,
            reps: reps
        }

        const postReps = await fetch("/api/rep", {
            method: "POST",
            body: JSON.stringify(workoutObj),
            headers: {
                "Content-Type": "application/json"
            }

        })

        if (postReps.ok) {
            handleReset();
        } else {
            console.error(postReps)
        }

    }





    const handleSweatin = () => {
        setSweating(true)
    }


    const handleTimeSelect = async (time: string, workouts: string) => {
        setLoading(true)
        setSubmitted(true)
        setMinutes(parseInt(time))

        try {
            const response = await fetch(`/api/workout/${workouts}`)
            const prompt = await response.json();


            let cleanedStr = prompt.instructions.replace(/\n/g, "")
            let cleanedArr = cleanedStr.split(/\d\./g)
            cleanedArr.shift()
            setWorkout({
                workout: prompt.workout,
                length: time,
                instructions: cleanedArr
            })

            let cleanedCal;

            if (prompt.calories.match(/ calories/g)) {
                cleanedCal = parseInt(prompt.calories.replace(/ calories/g, ""))
            } else {
                cleanedCal = parseInt(prompt.calories)
            }


            setLoading(false)
            setCalories(cleanedCal)

        } catch (error) {
            console.error(error)
        }

    }

    // const handleMultipleWorkouts = async (time: string, workouts: string) => {
    //     setLoading(true);
    //     setSubmitted(true)
    //     setMinutes(parseInt(time))

    //     try {
    //         const response = await fetch(`/api/workout/${workouts}`)
    //         const prompt = await response.json();


    //     } catch (error) {
    //         console.error(error)
    //     }
    // }



    return (
        <>
            <BrandBar />

            {
                totalMinutes > 0 && !submitted ?
                    <section id="metricsHeader">
                        <MinCounter minutes={totalMinutes} />
                        <WeekTracker />
                        <CalCounter calories={totalCal} />
                    </section>

                    :
                    <></>
            }

            {

                !submitted ?
                    <section id="timeContainer" className={totalMinutes > 0 ? "formContainer short-margin" : "formContainer long-margin"}>
                        <h3 id="minHeader">{totalMinutes > 0 ? "Got time to sweat again?" : "How much time do you have?"}</h3>

                        <button className="timeSelect" onClick={function () {
                            handleTimeSelect("5", "1")
                        }}>5 Minutes</button>
                        <button className="timeSelect" onClick={function () {
                            handleTimeSelect("10", "2")
                        }}>10 Minutes</button>
                        <button className="timeSelect" onClick={function () {
                            handleTimeSelect("15", "3")
                        }}>15 Minutes</button>
                    </section>

                    :
                    <></>
            }

            {
                loading ?
                    <section className="loadSection">
                        <h3 id="loadHeader">Creating your custom workout - get psyched!</h3>
                        <ProgressBar />
                    </section>
                    :
                    <></>
            }

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
                        <SetTimer minutes={minutes} setSweating={setSweating} />
                        <button type="button" className="timeSelect" id="sweatnBtn" onClick={handleSweatin}> I'm Sweatin' </button>
                    </section>

                    :
                    <></>

            }

            {
                sweating ?
                    <section id="countForm" className="formContainer">
                        <CountBanner />
                        {/* <form onSubmit={formik.handleSubmit} id="repsForm"> */}
                        <div id="repsFormRow">
                            <div onClick={() => setReps(reps - 1)}>
                                <svg id="minusSvg" width="37" height="16" viewBox="0 0 37 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.455469 15.7V0.299999H36.3555V15.7H0.455469Z" fill="#EC5D7F" />
                                </svg>

                            </div>

                            {/* <input
                                        type="text"
                                        name="reps"
                                        id="reps"
                                        className="formField"
                                        onChange={formik.handleChange}
                                        value={formik.values.reps}
                                        placeholder=""
                                    /> */}

                            <h1 className="text-bubble" id="repCounter">{reps <= 0 ? "#" : reps}</h1>
                            {/* put text here - overlay it with the form? Set value to form state. */}
                            <div onClick={() => setReps(reps + 1)}>
                                <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.645 18.7V0.399996H32.645V18.7H50.945V32.7H32.645V51H18.645V32.7H0.34502V18.7H18.645Z" fill="#EC5D7F" />
                                </svg>

                            </div>

                        </div>

                        <button type="button" className="timeSelect" id="doneBtn" onClick={handleSubmit}> {numWorkouts > 0 ? "Next" : "Done"} </button>
                        {/* </form> */}
                    </section>
                    :
                    <></>
            }

        </>
    )
}

export default Home;