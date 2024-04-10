import React from 'react'
import { formatHumanReadableTime } from '../helpers/time'

import './TimeList.scss'

function TimeList({ savedTimes }) {

   
   console.log(savedTimes[0])
  return (
    <div className="time-list">
      { savedTimes.map(savedTime => (
         <div className="time-list__item" key={savedTime.timeSavedAt}>
            <span>{savedTime.description}</span>
            <span>{formatHumanReadableTime(savedTime.time)}</span>
         </div>
      ))
      }
    </div>
  )
}

export default TimeList