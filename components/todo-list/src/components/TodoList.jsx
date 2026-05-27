import { useState, useEffect } from 'react'
import './TodoList.css'

export default function TodoList() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, text: 'Walk your dog'},
    { id: 2, text: 'Water the plants'},
    { id: 3, text: 'Wash the dishes'}
  ])
  const [srAnnouncement, setSrAnnouncement] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()

    if (!inputValue.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim()
    }

    setTodos([...todos, newTodo])
    setSrAnnouncement(`Added task: ${newTodo.text}`)
    setInputValue('')
  }

  const handleDeleteTask = (idToRemove, taskText) => {
    const updatedTodoList = todos.filter(todo => todo.id !== idToRemove)
    setTodos(updatedTodoList)
    setSrAnnouncement(`Deleted task: ${taskText}`)
  }

  return (
    <main className="todo-list-container">
      <h1 className="heading">Todo List</h1>

      <div aria-live="polite" className="sr-only">
        {srAnnouncement}
      </div>

      <form onSubmit={handleAddTask} className="form-group">
        <div className="input-wrapper">
          <label htmlFor="todo-input" className="label">
            Task Name
          </label>
          <input
            id="todo-input"
            type="text"
            placeholder="Add your task..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <ul aria-label="Current tasks" className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="list-item">
            <span className="list-text">{todo.text}</span>
            <button
              onClick={() => handleDeleteTask(todo.id, todo.text)}
              aria-label={`Delete ${todo.text}`}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
