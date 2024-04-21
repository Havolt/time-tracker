import { useState, useEffect } from 'react'

import SiteHelmet from './components/SiteHelmet'
import TimeList from './components/TimeList'
import SiteHeader from './components/SiteHeader'
import Stopwatch from './components/Stopwatch'

import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	useEffect(() => {
		console.log('in effect')
	  const localStorageTimes = JSON.parse(localStorage.getItem("timeArray"));

	  if(localStorageTimes?.savedTimes) {
		setSpentTime(localStorageTimes.savedTimes)
	  }
	}, [])
	

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

	// const removeSpentTime = (timePosition) => {
	// 	console.log(timePosition)
	// 	const spentTimeCopy = [...spentTime];

	// 	console.log(spentTimeCopy)

	// 	const cleanedSpentTime = spentTimeCopy.splice(timePosition, 1);

	// 	console.log(cleanedSpentTime)

	// 	setSpentTime(cleanedSpentTime);
	// }

	const removeSpentTime = (timePosition) => {
		setSpentTime((prevState) => prevState.filter((time, index) => index !== timePosition));
  };

	return (
		<div id="app">
			<SiteHelmet />
			<SiteHeader />
			<TimeList savedTimes={spentTime} removeSpentTime={removeSpentTime} />
			<Stopwatch saveSpentTime={saveSpentTime} />
		</div>
	)
}

export default App