import { createPortal } from 'react-dom'
import { useId, useEffect, useRef } from 'react'
import './ModalDialog.css'

export default function ModalDialog({ isOpen, onClose, title, children }) {
  const titleId = useId()
  const descriptionId = useId()
  const modalRef = useRef(null)
  const previouslyFocusedElement = useRef(null)
  
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement
    
    const getFocusableElements = () => {
      return modalRef.current?.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      )
    }

    // Focus on first element when modal opens
    const focusableElements = getFocusableElements()
    focusableElements?.[0]?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements()

      if (!focusableElements?.length) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      previouslyFocusedElement.current?.focus()
    }
  }, [isOpen, onClose])

  if(!isOpen) return null

  const modalRoot = document.getElementById('modal-root')

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
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

        <div id={descriptionId} className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  )
}