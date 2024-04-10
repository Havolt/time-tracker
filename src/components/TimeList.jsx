import React from 'react'
import { formatHumanReadableTime } from '../helpers/time'
import { CSSTransition } from 'react-transition-group';


import './TimeList.scss'

function TimeList({ savedTimes }) {

  return (
    <div className="time-list">
      { savedTimes.map(savedTime => (
        <CSSTransition key={savedTime.timeSavedAt} in={true} timeout={200} classNames="time-list__item" appear={true}>
          <div className="time-list__item" >
              <span>{savedTime.description}</span>
              <span>{formatHumanReadableTime(savedTime.time)}</span>
          </div>
        </CSSTransition>
      ))
      }
    </div>
  )
}

export default TimeList