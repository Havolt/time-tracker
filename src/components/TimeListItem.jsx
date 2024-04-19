import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TimeListItem({ key, description, time }) {
   // TODO: Add an information icon on hover. When clicked the timer expands to show delete and modify buttons.
   const nodeRef = useRef()

   const [isHovered, setIsHovered] = useState(false)

   const openOptions = () => {
      console.log('open options');
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
            className={`time-list__item ${isHovered ? 'time-list__item--hover' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            <div className="time-list__full">
               <div className="time-list__main">
                  <span>{description}</span>
                  <div>
                     <span>{time}</span>
                     {isHovered &&
                        <button
                           onClick={openOptions}
                           className={'time-list__options'}
                        >
                           <FontAwesomeIcon icon={`fa-solid fa-ellipsis`} />
                        </button>
                     }
                  </div>
               </div>
               <div className="time-list__supplemental">
                  test
               </div>
            </div>

         </div>
      </CSSTransition>
   )
}

export default TimeListItem