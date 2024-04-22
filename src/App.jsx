import { useState, useEffect, useRef } from 'react'

import SiteHelmet from './components/SiteHelmet'
import TimeList from './components/TimeList'
import SiteHeader from './components/SiteHeader'
import Stopwatch from './components/Stopwatch'

import './App.scss'

function App() {
	const [spentTime, setSpentTime] = useState([])

	const firstUpdate = useRef(true);

	// On initial render grab any times in local storage
	useEffect(() => {
	  const localStorageTimes = JSON.parse(localStorage.getItem("timeArray"));

	  if(localStorageTimes?.savedTimes) {
		setSpentTime(localStorageTimes.savedTimes)
	  }
	}, [])

	// Update Local Storage to be synced to state
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		saveUpdatedStorageList();
	}, [spentTime])
	

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

	const removeSpentTime = async (timePosition) => {
		await setSpentTime((prevState) => prevState.filter((time, index) => index !== timePosition));
	};

  const saveUpdatedStorageList = () => {
	localStorage.setItem("timeArray", JSON.stringify(
		{ savedTimes: [...spentTime] }
	))
  }

  const editTime = (timePosition) => {
	console.log({timePosition})
  }

	return (
		<div id="app">
			<SiteHelmet />
			<SiteHeader />
			<TimeList 
				savedTimes={spentTime} 
				removeSpentTime={removeSpentTime} 
				editTime={editTime} 
			/>
			<Stopwatch saveSpentTime={saveSpentTime} />
		</div>
	)
}

export default App