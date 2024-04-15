import React from 'react'
import { formatHumanReadableTime } from '../helpers/time'
import TimeListItem from './TimeListItem'

import { TransitionGroup } from 'react-transition-group';

import './TimeList.scss'


function TimeList({ savedTimes }) {

  return (
    <div className="time-list">
      <TransitionGroup className="test">
        { savedTimes.map(savedTime => (
          <TimeListItem 
            key={savedTime.timeSavedAt} 
            description={savedTime.description}
            time={formatHumanReadableTime(savedTime.time)}
          />
        ))}
      </TransitionGroup>
    </div>
  )
}

export default TimeList