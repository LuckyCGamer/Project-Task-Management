import { useState, useRef, useEffect } from "react"
import { useTaskOperations } from "./context/TaskContext"

export default function TaskItem({ task, className, style }) {
  const { updateTask, deleteTask, toggleTaskCompletion } = useTaskOperations()
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(task.text)
  const [description, setDescription] = useState(task.description || "")
  const [status, setStatus] = useState(task.status || "To Do")
  const [priority, setPriority] = useState(task.priority || "Low")
  const [checked, setChecked] = useState(task.completed || false)
  const cardRef = useRef(null)

  const priorityColors = {
    High: "text-red-600 border-red-200 dark:border-red-900",
    Medium: "text-yellow-500 border-yellow-200 dark:border-yellow-900",
    Low: "text-green-500 border-green-200 dark:border-green-900",
  }

  // Save changes and close edit mode
  const handleSave = () => {
    updateTask(task.id, { 
      ...task, 
      text, 
      description, 
      status, 
      priority 
    })
    setEditing(false)
  }
  // Listen for clicks outside the card
  useEffect(() => {
    if (!editing) return

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        handleSave()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [editing, text, description, status, priority]) // dependencies

  return (
    <div
      ref={cardRef}
      className={`group flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-input hover:shadow-sm transition-all duration-200 bg-card cursor-pointer ${className}`}
      style={style}
      onClick={() => setEditing(true)}
    >
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
            <input
              className="input"
              value={text}
              onChange={e => setText(e.target.value)}
              autoFocus
              placeholder="Task name"
            />
            <textarea
              className="input"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              rows={2}
            />
            <select
              className="input"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              className="input"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  onClick={e => {e.stopPropagation(); toggleTaskCompletion(task)}}
                  className="accent-green-500 w-5 h-5 cursor-pointer" // Medium size
                  style={{ minWidth: "1.25rem", minHeight: "1.25rem" }} // Ensures size in all browsers
                  title="Mark as done"
                />
                <div className="min-w-0">
                  <p className={`text-sm font-medium transition-all duration-200 ${checked ? "line-through text-gray-400" : ""}`}>
                    {task.text}
                  </p>
                  {task.description && (
                    <p className="text-xs text-gray-500 mt-1 break-all">
                      {task.description}
                    </p>
                  )}
                  <span className="text-xs text-muted-foreground block mt-1">
                    Priority : <span className={`font-medium ${priorityColors[task.priority]}`}>{task.priority || "Low"}</span> | Status : <span className="font-medium">{task.status || "Pending"}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 text-muted-foreground hover:text-destructive rounded cursor-pointer"
                title="Delete task"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}