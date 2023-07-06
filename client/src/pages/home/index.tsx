import React, { useEffect, useState } from "react";
import BrandBar from "../../components/brandBar";
import { response } from "express";

function Home() {

    const [workout, setWorkout] = useState<String>("")

    useEffect(() => {
        fetch("/api/workout").then(response => response.json()).then(data => {
            setWorkout(data.name)
        })
    }, [])

    return (
        <>
            <BrandBar />
            

        </>
    )
}

export default Home;