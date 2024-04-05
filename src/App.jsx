import { useState } from 'react'
import Stopwatch from './components/Stopwatch'
import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	const saveSpentTime = (time, description) => {
		spentTime.push({
			time,
			description,
		})
	}

	return (
		<div id="app">
			<Stopwatch saveSpentTime={saveSpentTime} />
		</div>
	)
}

export default App