import { useState, useRef, useEffect } from "react"
import { useTaskOperations } from "./context/TaskContext"

export default function TaskItem({ task, className, style }) {
  const { updateTask } = useTaskOperations()
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(task.text)
  const [status, setStatus] = useState(task.status || "Pending")
  const cardRef = useRef(null)

  // Save changes and close edit mode
  const handleSave = () => {
    updateTask(task.id, { ...task, text, status })
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
  }, [editing, text, status]) // dependencies

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
            <select
              className="input"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium transition-all duration-200">
              {task.text}
            </p>
            <span className="text-xs text-muted-foreground block mt-1">
              Status: <span className="font-medium">{task.status || "Pending"}</span>
            </span>
          </>
        )}
      </div>
    </div>
  )
}