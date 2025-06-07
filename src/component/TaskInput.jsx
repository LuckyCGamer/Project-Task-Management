import { useState } from "react"

export default function TaskInput() {
  const [text, setText] = useState("")

  // Using React 19's automatic batching for state updates
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {

      setText("")
    }
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

          <div className="flex items-center justify-between">
            <div>

            </div>

            <button type="submit" className="btn-primary px-6 py-2">
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
