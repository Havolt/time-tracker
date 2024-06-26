import React from 'react'
import ReactDOM from 'react-dom/client'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faTrash, faFloppyDisk, faPause, faUndo, faEllipsis, faEraser, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import App from './App.jsx'
import './index.css'

library.add(faPlay, faTrash, faFloppyDisk, faPause, faUndo, faEllipsis, faEraser, faPenToSquare)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
