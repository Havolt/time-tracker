import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatHumanReadableTime } from '../helpers/time'
import './Stopwatch.scss'

function Stopwatch({ saveSpentTime }) {
   // State
   const [startTimer, setStartTimer] = useState(false)
   const [timePassed, setTimePassed] = useState(0)
   const [saveRequested, setSaveRequested] = useState(false)
   const [invalidSave, setInvalidSave] = useState(false)

   // Refs
   const descriptionRef = useRef(null)

   const timerPaused = !timePassed || startTimer
   const timerPlaying = timePassed >= 0 && startTimer

   let timePassedInterval
   useEffect(() => {
      if (startTimer) {
         timePassedInterval = setInterval(() => {
            setTimePassed(timePassed => timePassed + 1)
         }, 1000)
      }
      return () => clearInterval(timePassedInterval)
   }, [startTimer, timePassed])

   const highlightInput = () => {
      setTimeout(() => {
         if(descriptionRef.current) {
            descriptionRef.current.focus()
         } else {
            highlightInput()
         }
      }, 5)
   }

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
         highlightInput()
      }
   }

   /**
      * Resets the timer by setting time passed to 0 and initializing start time to null.
   */
   const clearTimer = () => {
      setTimePassed(0)
      setSaveRequested(false)
      setInvalidSave(false)
   }

   const revertSaveRequested = () => {
      setSaveRequested(false)
   }

   /**
      * Handles the start and stop functionality of the timer.
      * If the timer is stopped, it starts the timer and vice versa.
   */
   const handleTimer = () => {
      if (!startTimer) {
         setStartTimer(true)
      } else {
         clearInterval(timePassedInterval)
         setStartTimer(false)
      }
   }

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

   // HTML
   const playButtonIcon = timerPlaying ? 'pause' : 'play'
   const stopButtonIcon = saveRequested ? 'undo' : 'trash'

   const clearButton = (
      <button
         onClick={saveRequested ? revertSaveRequested : clearTimer}
         disabled={timerPaused}
         className="timer__button--clear"
         type="button"
         title={!timerPaused ? 'Clear Time' : ''}
      >
         <FontAwesomeIcon icon={`fa-solid fa-${stopButtonIcon}`} />
      </button>
   )

   return (
      <div className="timer">
         <div className="timer__input">
            { invalidSave && <div className="timer__input-warning">Please enter a description</div> }
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
         </div>
         <div className="timer__buttons">
            <span>{timePassed >=0 ? formatHumanReadableTime(timePassed) : '00:00:00'}</span>
            <div className="timer__actions">
               <button 
                  onClick={handleTimer} 
                  className="timer__button--start"
                  disabled={saveRequested}
                  title={!timerPlaying ? 'Start Timer' : 'Pause Timer'}
               >
                  <FontAwesomeIcon icon={`fa-solid fa-${playButtonIcon}`} />
               </button>
               {clearButton}
            </div>

            <div className="timer__save">
               <button 
                  onClick={saveTimer} 
                  className="timer__button--save"
                  disabled={timerPaused}
                  title={!timerPaused ? 'Save Time' : ''}
               >
                  <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
               </button>
            </div>
         </div>
      </div>
   )
}

export default Stopwatch