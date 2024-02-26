import React, { useState, useEffect } from "react";

interface todayDate {
    day: number
}

function WeekTracker(props: todayDate) {

    const [weeklyMetrics, setWeeklyMetrics] = useState([0, 0, 0, 0, 0])

    useEffect(() => {

        let newMetrics = weeklyMetrics.map((element, index) => {
            let storageObj = localStorage.getItem(`${index + 1}`)

            if (storageObj) {
                let parsedObj = JSON.parse(storageObj);
                return parsedObj.minutesDone
            } else {
                return 0
            }
        })

        setWeeklyMetrics(newMetrics)

    }, [])

    const calculateColor = (minutes: number) => {
        let colorClass;
        if (minutes > 0 && minutes <= 5) {
            colorClass = "back-light"
        } else if (minutes > 5 && minutes <= 10) {
            colorClass = "back-med"
        } else if (minutes > 10) {
            colorClass = "back-dark"
        } else {
            colorClass = ""
        }
        return colorClass
    }

    const isToday = (currentDay: number, boxDay: number) => {
        if (currentDay === boxDay) {
            return "today"
        } else {
            return ""
        }
    }

    return (
        <section id="weekTracker">

            <div className="weekday-box">
                <p className="text-fade">M</p>
                <div className={`color-box ${calculateColor(weeklyMetrics[0])} ${isToday(1, props.day)}`}></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">T</p>
                <div className={`color-box ${calculateColor(weeklyMetrics[1])} ${isToday(2, props.day)}`}></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">W</p>
                <div className={`color-box ${calculateColor(weeklyMetrics[2])} ${isToday(3, props.day)}`}></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">Th</p>
                <div className={`color-box ${calculateColor(weeklyMetrics[3])} ${isToday(4, props.day)}`}></div>
            </div>
            <div className="weekday-box">
                <p className="text-fade">F</p>
                <div className={`color-box ${calculateColor(weeklyMetrics[4])} ${isToday(5, props.day)}`}></div>
            </div>


        </section>
    )
}

export default WeekTracker