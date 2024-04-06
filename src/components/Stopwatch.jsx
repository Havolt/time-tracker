import { useState, useEffect, useRef } from 'react'
import './Stopwatch.scss'

function Stopwatch({ saveSpentTime }) {
   // State
   const [startTimer, setStartTimer] = useState(false)
   const [initTime, setInitTime] = useState(null)
   const [timePassed, setTimePassed] = useState(0)

   // Refs
   const descriptionRef = useRef(null);

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
      clearTimer()
      // TODO: Save time to local storage / extension storage
      saveSpentTime(timePassed, descriptionRef.current.value)
      descriptionRef.current.value = ''
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

   /**
      * @returns {string} Formatted time string (HH:mm:ss).
   */
   function formatTimePassed() {
      const date = new Date(0)
      date.setSeconds(timePassed)
      const timeString = date.toISOString().substring(11, 19)
      return timeString
   }

   // HTML
   const clearButton = (
      <button
         onClick={clearTimer}
         disabled={timerPaused}
         className="timer__button--clear"
         type="button"
      >
         Clear
      </button>
   )
   const saveInput = (
      <div className="timer__save">
         <input type="text" ref={descriptionRef} placeholder="Description.." />
         <button onClick={saveTimer} className="timer__button--save">Save</button>
      </div>
   )

   return (
      <div className="timer">
         <span>{timePassed ? formatTimePassed() : '00:00:00'}</span>
         <div className="timer__actions">
            <button onClick={handleTimer} className="timer__button--start">
               {startTimerText()}
            </button>
            {clearButton}
         </div>

         {(!startTimer && timePassed) ?
            <>
               {saveInput}
            </> : null
         }
      </div>
   )
}

export default Stopwatch