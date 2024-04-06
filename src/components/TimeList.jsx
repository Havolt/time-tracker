import React from 'react'

function TimeList({ savedTimes }) {
   
   console.log(savedTimes[0])
  return (
    <div>
      { savedTimes.map(savedTime => (
         <div key={savedTime.description}>
            <span>{savedTime.time}</span>
            <span>{savedTime.description}</span>
         </div>
      ))
      }
    </div>
  )
}

export default TimeList