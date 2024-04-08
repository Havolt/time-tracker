import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatHumanReadableTime } from '../helpers/time'
import './Stopwatch.scss'

function Stopwatch({ saveSpentTime }) {
   // State
   const [startTimer, setStartTimer] = useState(false)
   const [initTime, setInitTime] = useState(null)
   const [timePassed, setTimePassed] = useState(0)
   const [saveRequested, setSaveRequested] = useState(false)

   // Refs
   const descriptionRef = useRef(null)

   const timerPaused = !timePassed || startTimer;

   let timePassedInterval;
   useEffect(() => {
      if (startTimer) {
         timePassedInterval = setInterval(() => {
            setTimePassed(timePassed => timePassed + 1)
         }, 1000)
      }
      return () => clearInterval(timePassedInterval)
   }, [startTimer, timePassed])

   const saveTimer = () => {
      if(saveRequested) {
         clearTimer()
         // TODO: Save time to local storage / extension storage
         saveSpentTime(timePassed, descriptionRef.current.value)
         descriptionRef.current.value = ''
         setSaveRequested(false)
      } else {
         setSaveRequested(true)
      }
   }

   /**
       * @returns {string} Text for the timer control button.
   */
   const startTimerText = () => {
      if (startTimer) {
         return 'Stop'
      } else if (!startTimer && timePassed) {
         return 'Resume'
      } else {
         return 'Start'
      }
   }

   /**
      * Resets the timer by setting time passed to 0 and initializing start time to null.
   */
   const clearTimer = () => {
      setTimePassed(0)
      setInitTime(null)
      setSaveRequested(false)
   }

   /**
      * Handles the start and stop functionality of the timer.
      * If the timer is stopped, it starts the timer and vice versa.
   */
   const handleTimer = () => {
      if (!startTimer) {
         setInitTime(new Date())
         setStartTimer(true)
      } else {
         clearInterval(timePassedInterval)
         setStartTimer(false)
      }
   }

   // HTML
   const clearButton = (
      <button
         onClick={clearTimer}
         disabled={timerPaused}
         className="timer__button--clear"
         type="button"
      >
         <FontAwesomeIcon icon="fa-solid fa-trash" />
      </button>
   )

   return (
      <div className="timer">
         <span>{timePassed ? formatHumanReadableTime(timePassed) : '00:00:00'}</span>
         <div className="timer__actions">
            <button onClick={handleTimer} className="timer__button--start">
               <FontAwesomeIcon icon="fa-solid fa-play" />
            </button>
            {clearButton}
         </div>

         <div className="timer__save">
            { saveRequested && 
               <input 
                  type="text" 
                  ref={descriptionRef}
                  placeholder="Description.." 
               />
            }
            <button 
               onClick={saveTimer} 
               className="timer__button--save"
               disabled={timerPaused}
            >
               <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
            </button>
         </div>
      </div>
   )
}

export default Stopwatch