import { useState } from 'react'
import Stopwatch from './components/Stopwatch'
import TimeList from './components/TimeList'
import SiteHeader from './components/SiteHeader'
import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	const saveSpentTime = (time, description) => {
		setSpentTime([...spentTime, { time, description, timeSavedAt: new Date().getTime() }])
	}

	return (
		<div id="app">
			<SiteHeader />
			<TimeList savedTimes={spentTime} />
			<Stopwatch saveSpentTime={saveSpentTime} />
		</div>
	)
}

export default App