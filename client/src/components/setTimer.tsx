import React, {useState, useEffect} from "react";


interface timerProps {
    minutes: number
}

function SetTimer(props: timerProps) {

    const [seconds, setSeconds] = useState<number>(props.minutes * 60)


    
    useEffect(() => {

        if (seconds <= 0) {
            return;
        }
        setTimeout(()=> {
            setSeconds(seconds - 1)
        }, 1000)
    }, [seconds])
    
      
    


    const formatTime = (timeInSeconds: number) => {
        let minuteForm = Math.floor(timeInSeconds / 60).toString()
        let secForm = (timeInSeconds % 60).toString()

        if (parseInt(secForm) < 10) {
           secForm =  secForm.padStart(2, "0")
        }

        return `${minuteForm}:${secForm}`

    }

    return (
        <h2 className="text-bubble" id="timerText">{formatTime(seconds)}</h2>
    )
}

export default SetTimer