import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatHumanReadableTime } from '../helpers/time'
import './Stopwatch.scss'

function Stopwatch({ saveSpentTime }) {
   // State
   const [startTimer, setStartTimer] = useState(false)
   const [initTime, setInitTime] = useState(null)
   const [timePassed, setTimePassed] = useState(-1)
   const [saveRequested, setSaveRequested] = useState(false)
   const [invalidSave, setInvalidSave] = useState(false)

   // Refs
   const descriptionRef = useRef(null)

   const timerPaused = !timePassed || startTimer;
   const timerPlaying = timePassed >= 0 && startTimer;

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
      if(saveRequested && descriptionRef.current.value.length > 0) {
         clearTimer()
         // TODO: Save time to local storage / extension storage
         saveSpentTime(timePassed, descriptionRef.current.value)
         descriptionRef.current.value = ''
         setSaveRequested(false)
         setInvalidSave(false)
      } else if(saveRequested) {
         setInvalidSave(true)
      } else {
         setSaveRequested(true)
         setInvalidSave(false)
      }
   }

   /**
      * Resets the timer by setting time passed to 0 and initializing start time to null.
   */
   const clearTimer = () => {
      setTimePassed(0)
      setInitTime(null)
      setSaveRequested(false)
      setInvalidSave(false)
   }

   /**
      * Handles the start and stop functionality of the timer.
      * If the timer is stopped, it starts the timer and vice versa.
   */
   const handleTimer = () => {
      if (!startTimer) {
         setInitTime(new Date())
         setStartTimer(true)
         setTimePassed(0)
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

   const handleInputChange = (event) => {
      if(invalidSave && event.target.val !== '') {
         setInvalidSave(false)
      }
   }

   const submitSaveTimer = (event) => {
      if(event.key === 'Enter') {
         saveTimer()
      }
   }

   return (
      <div className="timer">
         <span>{timePassed >=0 ? formatHumanReadableTime(timePassed) : '00:00:00'}</span>
         <div className="timer__actions">
            <button onClick={handleTimer} className="timer__button--start">
               { timerPlaying ? <FontAwesomeIcon icon="fa-solid fa-pause" /> : <FontAwesomeIcon icon="fa-solid fa-play" /> }
            </button>
            {clearButton}
         </div>

         <div className="timer__save">
            { saveRequested && 
               <input 
                  type="text" 
                  ref={descriptionRef}
                  placeholder="Description.."
                  className={`${invalidSave ? 'invalid': ''}`}
                  onChange={handleInputChange}
                  onKeyDown={submitSaveTimer}
               />
            }
            { invalidSave && <div className="timer__save-warning">Please enter a description</div> }
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