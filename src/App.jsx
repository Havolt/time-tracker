import { useState, useEffect } from 'react'
import './App.scss'

function App() {
    const [initTime, setInitTime] = useState(null)
    const [timePassed, setTimePassed] = useState(0)
    const [startTimer, setStartTimer] = useState(false)

    useEffect(() => {
        let interval;
        if(startTimer) {
            interval = setInterval(() => {
                setTimePassed(timePassed => timePassed + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [startTimer, timePassed])

    const handleTimer = () => {
        if(!initTime) {
            setInitTime(new Date())
            setStartTimer(true)
        }
    }

    return (
        <div id="app">
            <div>
                <span>{ timePassed && timePassed }</span>
                <button onClick={handleTimer}>Go</button>
            </div>
        </div>
    )
}

export default App