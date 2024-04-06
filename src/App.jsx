import { useState } from 'react'
import Stopwatch from './components/Stopwatch'
import TimeList from './components/TimeList'
import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	const saveSpentTime = (time, description) => {
		setSpentTime([...spentTime, { time, description }])
	}

	return (
		<div id="app">
			<TimeList savedTimes={spentTime} />
			<Stopwatch saveSpentTime={saveSpentTime} />
		</div>
	)
}

export default App