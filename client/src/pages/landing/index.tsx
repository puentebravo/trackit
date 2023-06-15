import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css"

function Landing() {

    const navigate = useNavigate()
    
    useEffect( () => {
        setTimeout(() => {
            navigate("/login")
        }, 3000)
    }, [])

    return (
        <main id="splashText">
            <h1 id="headerText">.solid</h1>
            <p id="subText">between meeting fitness</p>
        </main>
    )
}

export default Landing;