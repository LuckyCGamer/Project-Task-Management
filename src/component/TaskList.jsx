
import { useTasks, useTaskOperations } from "./context/TaskContext"
import TaskItem from "./TaskItem"

export default function TaskList({ filter }) {
  const tasks = useTasks()
  console.log(tasks)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "pending") return task.status === "Pending"
    if (filter === "inprogress") return task.status === "In Progress"
    if (filter === "completed") return task.status === "Completed"
  })

  if (filteredTasks.length === 0) {
    return (
      <div className="card animate-fade-in mt-5">
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            {"Start by adding your first task above"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-5">
      <div className="card animate-slide-up">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Tasks ({filteredTasks.length})</h2>
          </div>
        </div>
        <div className="card-content">
          <div className="space-y-2">
            {filteredTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-scale-in"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
