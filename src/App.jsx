import { useState } from 'react'

import SiteHelmet from './components/SiteHelmet'
import TimeList from './components/TimeList'
import SiteHeader from './components/SiteHeader'
import Stopwatch from './components/Stopwatch'

import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	const saveSpentTime = (time, description) => {
		setSpentTime([...spentTime, { time, description, timeSavedAt: new Date().getTime() }])
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