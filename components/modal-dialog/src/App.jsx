import { useState } from 'react'
import ModalDialog from './components/ModalDialog'
import './components/ModalDialog.css'

const content = `Provide your feedback, we will get back in 3-5 business days.`

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <h1>Main Web Page Content</h1>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Feedback"
      >
        <p>{content}</p>
        <input placeholder="your_email@email.com" />
        <textarea placeholder="Your message here" rows={5}></textarea>
        <button className="feedback-submit-button" type="button">Submit</button>
      </ModalDialog>
    </div>
  )
}

export default App
