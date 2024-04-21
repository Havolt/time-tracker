import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TimeListItem({ listIndex, description, time, removeSpentTime }) {
   // TODO: Add an information icon on hover. When clicked the timer expands to show delete and modify buttons.
   const nodeRef = useRef()

   const [isHovered, setIsHovered] = useState(false)
   const [isExpanded, setIsExpanded] = useState(false)

   const highlightedItem = isHovered || isExpanded

   const openOptions = () => {
      setIsExpanded((prevState) => !prevState)
   }

   return (
      <CSSTransition
         in={true}
         nodeRef={nodeRef}
         timeout={200}
         classNames="time-list__item"
      >
         <div
            ref={nodeRef}
            className={`time-list__item ${highlightedItem ? 'time-list__item--hover' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            <div className="time-list__full">
               <div className="time-list__main">
                  <span>{description}</span>
                  <div>
                     <span>{time}</span>
                     {highlightedItem &&
                        <button
                           onClick={openOptions}
                           className={'time-list__options'}
                        >
                           <FontAwesomeIcon icon={`fa-solid fa-ellipsis`} />
                        </button>
                     }
                  </div>
               </div>
               {isExpanded &&
                  <div className="time-list__supplemental">
                     <button>
                        <FontAwesomeIcon icon={`fa-solid fa-pen-to-square`} />
                     </button>
                     <button>
                        <FontAwesomeIcon onClick={() => removeSpentTime(listIndex)} icon={`fa-solid fa-eraser`} />
                     </button>
                  </div>
               }
               
            </div>

         </div>
      </CSSTransition>
   )
}

export default TimeListItem