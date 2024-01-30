import React from "react";

function WeekTracker() {


    return (
        <section id="weekTracker">
            <div className="weekday-box">
                <p className="text-fade">M</p>
                <div className="color-box"></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">T</p>
                <div className="color-box"></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">W</p>
                <div className="color-box"></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">Th</p>
                <div className="color-box"></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">F</p>
                <div className="color-box"></div>
            </div>
        </section>
    )
}

export default WeekTracker