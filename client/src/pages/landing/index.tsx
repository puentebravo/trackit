import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css"

function Landing() {

    const navigate = useNavigate()
    
    // Displays splash screen for five seconds on load
    useEffect( () => {
        setTimeout(() => {
            navigate("/login")
        }, 5000)
    }, [])

    return (
        <main id="splashText">
            <h1 id="headerText">.solid</h1>
            <p id="subText">between meeting fitness</p>
        </main>
    )
}

export default Landing;