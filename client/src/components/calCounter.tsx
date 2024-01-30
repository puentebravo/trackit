import React from "react";

interface kCals {
    calories: number
}

function CalCounter(props: kCals) {

    return (
        <section id="sweatCalories">
            <h2 id="calHeader" className="text-bubble">{props.calories}<span id="kcalSpan" className="text-bubble"> kcal</span></h2>
        </section>
    )
}

export default CalCounter