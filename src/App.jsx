import { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
	const [initTime, setInitTime] = useState(null)
	const [timePassed, setTimePassed] = useState(0)
	const [startTimer, setStartTimer] = useState(false)
	const [spentTime, setSpentTime] = useState([])

	const descriptionRef = useRef(null);

	const timerPaused = !timePassed || startTimer;

	let timePassedInterval;

	const startTimerText = () => {
		if (startTimer) {
			return 'Stop'
		} else if (!startTimer && timePassed) {
			return 'Resume'
		} else {
			return 'Start'
		}

	}

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

	// HTML
	const clearButton = (
		<button
			onClick={clearTimer}
			disabled={timerPaused}
			class="timer__button--clear"
			type="button"
		>
			Clear
		</button>
	)
	const saveInput = (
		<div class="timer__save">
			<input type="text" ref={descriptionRef} placeholder="Description.." />
			<button onClick={saveTimer} class="timer__button--save">Save</button>
		</div>
	)

	return (
		<div id="app">
			<div className="timer">
				<span>{timePassed ? formatTimePassed() : '00:00:00'}</span>
				<div class="timer__actions">
					<button onClick={handleTimer} class="timer__button--start">
						{startTimerText()}
					</button>
					{clearButton}
				</div>

				{(!startTimer && timePassed) ?
					<>
						{saveInput}
					</> : null
				}

			</div>
		</div>
	)
}

export default App