import { createPortal } from 'react-dom'
import { useId, useEffect } from 'react'
import './ModalDialog.css'

export default function ModalDialog({ isOpen, onClose, title, children }) {
  const titleId = useId()
  const descriptionId = useId()
  
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }

  }, [isOpen, onClose])

  if(!isOpen) return null

  const modalRoot = document.getElementById('modal-root')

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal={true}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="title-container">
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            X
          </button>
        </div>

        <div id={descriptionId} className="modal-content">{children}</div>
      </div>
    </div>,
    modalRoot
  )
}