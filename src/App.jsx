import { useState } from 'react'

import SiteHelmet from './components/SiteHelmet'
import TimeList from './components/TimeList'
import SiteHeader from './components/SiteHeader'
import Stopwatch from './components/Stopwatch'

import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	const saveSpentTime = (time, description) => {
		// Save to state
		const newTime = { time, description, timeSavedAt: new Date().getTime() };
		setSpentTime([...spentTime, newTime])
		// Save to local storage (need to move to chrome storage)
		const localStorageArr = JSON.parse(localStorage.getItem("timeArray")) || {savedTimes: []}
		localStorage.setItem("timeArray", JSON.stringify(
			{ savedTimes: [...localStorageArr.savedTimes, newTime] }
		))
	}

	return (
		<div id="app">
			<SiteHelmet />
			<SiteHeader />
			<TimeList savedTimes={spentTime} />
			<Stopwatch saveSpentTime={saveSpentTime} />
		</div>
	)
}

export default App