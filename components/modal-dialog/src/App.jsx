import { useState } from 'react'
import ModalDialog from './components/ModalDialog'

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
        title="What are Modal Dialogs"
      >
        <p>{`Modal dialogs are interactive overlay windows that temporarily
            disable the main content of a web page, focusing user attention
            on specific tasks or information. They serve various purposes,
            including displaying critical alerts, requesting user input,
            confirming actions, and presenting additional content without
            navigating away from the current context.`}
        </p>
      </ModalDialog>
   </div>
  )
}

export default App
