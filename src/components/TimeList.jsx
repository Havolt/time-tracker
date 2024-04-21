import React from 'react'
import { formatHumanReadableTime } from '../helpers/time'
import TimeListItem from './TimeListItem'

import { TransitionGroup } from 'react-transition-group';

import './TimeList.scss'


function TimeList({ savedTimes, removeSpentTime }) {

  console.log('TimeList render')
  console.log(savedTimes)

  return (
    <div className="time-list">
      {/* <TransitionGroup className="test"> */}
        { savedTimes.map((savedTime, index) => (
          <TimeListItem 
            key={savedTime.timeSavedAt} 
            listIndex={index} 
            description={savedTime.description}
            time={formatHumanReadableTime(savedTime.time)}
            removeSpentTime={removeSpentTime}
          />
        ))}
      {/* </TransitionGroup> */}
    </div>
  )
}

export default TimeList