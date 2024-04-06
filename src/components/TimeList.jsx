import React from 'react'
import { formatHumanReadableTime } from '../helpers/time'

function TimeList({ savedTimes }) {

   
   console.log(savedTimes[0])
  return (
    <div>
      { savedTimes.map(savedTime => (
         <div key={savedTime.timeSavedAt}>
            <span>{savedTime.description}</span>
            <span>{formatHumanReadableTime(savedTime.time)}</span>
         </div>
      ))
      }
    </div>
  )
}

export default TimeList