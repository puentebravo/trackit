import React from "react";

interface minutes {
    minutes: number
}

function MinCounter(props: minutes) {

    return (
        <section id="sweatCount">
            <h2 className="text-bubble">{props.minutes}</h2>
            <aside id="minColumnText">
                <p className="text-pink">minutes</p>
                <p className="text-pink" id="sweatnText">sweatin'</p>
                <p className="text-pink">so far</p>
            </aside>

        </section>
    )
}

export default MinCounter