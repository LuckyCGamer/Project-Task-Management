import { useState } from "react"
import { useTaskOperations } from "./context/TaskContext"

export default function TaskInput() {
  const [text, setText] = useState("")
  const { addTask } = useTaskOperations()
  const [priority, setPriority] = useState("Medium") // Default priority


  // Using React 19's automatic batching for state updates
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return // Prevent adding empty tasks
      addTask(text, "To Do", priority)
      console.log(`Task added: "${text}" with priority "${priority}"`)
      setText("")
      setPriority("Medium") // Reset priority to default
  }

  return (
    <div className="card animate-slide-up">
      <div className="card-header">
        <h2 className="text-lg font-semibold">Add New Task</h2>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input text-lg"
              autoFocus
            />
          </div>

          {/* Priority selector and Add Task button on the same row */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-700">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`
                    rounded-md border-2 px-8 py-1 text-sm shadow-sm cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                    transition-all duration-150 bg-white
                    ${priority === "Low" ? "border-green-400" : ""}
                    ${priority === "Medium" ? "border-yellow-400" : ""}
                    ${priority === "High" ? "border-red-400" : ""}
                    appearance-none font-medium text-gray-700
                  `}
                  style={{ minWidth: "110px" }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {/* Colored dot indicator */}
                <span className={`
                  absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full
                  ${priority === "Low" ? "bg-green-400" : ""}
                  ${priority === "Medium" ? "bg-yellow-400" : ""}
                  ${priority === "High" ? "bg-red-400" : ""}
                  border border-white shadow
                `}></span>
                {/* Dropdown arrow */}
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <button type="submit" disabled={!text.trim()} className="btn-primary px-6 py-2 flex items-center cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
