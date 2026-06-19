import { createPortal } from 'react-dom'
import { useId } from 'react'
import './ModalDialog.css'

export default function ModalDialog({ isOpen, onClose, title, children }) {
  if(!isOpen) return null

  const titleId = useId()
  const descriptionId = useId()

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