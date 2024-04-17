import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

function TimeListItem({key, description, time}) {
   // TODO: Add an information icon on hover. When clicked the timer expands to show delete and modify buttons.
   const nodeRef= useRef()

   const [isHovered, setIsHovered] = useState(false)

  return (
      <CSSTransition
         in={true}
         nodeRef={nodeRef}
         timeout={200} 
         classNames="time-list__item"
      >
         <div
            ref={nodeRef}
            className={`time-list__item ${ isHovered ? 'time-list__item--hover' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            <span>{description}</span>
            <span>{time}</span>
         </div>
      </CSSTransition>
  )
}

export default TimeListItem