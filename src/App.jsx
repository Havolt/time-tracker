import { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
	const [initTime, setInitTime] = useState(null)
	const [timePassed, setTimePassed] = useState(0)
	const [startTimer, setStartTimer] = useState(false)
	const [spentTime, setSpentTime] = useState([])

	const descriptionRef = useRef(null);

	let timePassedInterval;

	useEffect(() => {
		if (startTimer) {
			timePassedInterval = setInterval(() => {
				setTimePassed(timePassed => timePassed + 1)
			}, 1000)
		}
		return () => clearInterval(timePassedInterval)
	}, [startTimer, timePassed])

	const handleTimer = () => {
		if (!startTimer) {
			setInitTime(new Date())
			setStartTimer(true)
		} else {
			clearInterval(timePassedInterval)
			setStartTimer(false)
		}
	}

	const saveTimer = () => {
		clearTimer()
		// TODO: Save time to local storage / extension storage
		spentTime.push({
			time: timePassed,
			description: descriptionRef.current.value
		})
		descriptionRef.current.value = ''
	}

	const clearTimer = () => {
		setTimePassed(0)
		setInitTime(null)
	}

	function formatTimePassed() {
		const date = new Date(0)
		date.setSeconds(timePassed)
		const timeString = date.toISOString().substring(11, 19)
		return timeString
	}

	return (
		<div id="app">
			<div className="timer">
				<span>{timePassed ? formatTimePassed() : '00:00:00'}</span>
				<button onClick={handleTimer}>{ startTimer ? 'Stop timer' : 'Start timer'}</button>
				<button disabled={!timePassed || startTimer} onClick={saveTimer}>Save Time</button>
				{ (!startTimer && timePassed) ? <button onClick={clearTimer} type="button">Clear Time</button> : null }
				{ (!startTimer && timePassed) ? <input type="text" ref={descriptionRef} placeholder="Description.." /> : null }
			</div>
		</div>
	)
}

export default App