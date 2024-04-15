import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group';

function TimeListItem({key, description, time}) {
   const nodeRef= useRef();
  return (
      <CSSTransition
         in={true}
         nodeRef={nodeRef}
         timeout={200} 
         classNames="time-list__item"
      >
         <div
            ref={nodeRef}
            className="time-list__item"
         >
            <span>{description}</span>
            <span>{time}</span>
         </div>
      </CSSTransition>
  )
}

export default TimeListItem