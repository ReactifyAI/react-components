import './ModalDialog.css'

export default function ModalDialog({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="title-container">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}