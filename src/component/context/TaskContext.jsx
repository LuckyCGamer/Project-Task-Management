import { createContext, useContext, useReducer, useMemo, useCallback } from "react"

// Create context
const TasksContext = createContext(null)
const TasksDispatchContext = createContext(null)

// Task reducer
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        {
          id: crypto.randomUUID(),
          text: action.text,
          status: action.status || "To Do",
          createdAt: new Date().toISOString(),
          priority: action.priority || "Medium",
        },
        ...tasks,
      ]
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task
        }
        return t
      })
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id)
    }
    case "toggle_all": {
      const allCompleted = tasks.every((t) => t.completed)
      return tasks.map((t) => ({ ...t, completed: !allCompleted }))
    }
    case "clear_completed": {
      return tasks.filter((t) => !t.completed)
    }
    default: {
      throw new Error("Unknown action: " + action.type)
    }
  }
}

// Initial tasks
const initialTasks = [
  {
    id: "1",
    text: "Learn React 19 features",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    text: "Update project dependencies",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    status: "Done",
    priority: "Low",
  },
  {
    id: "3",
    text: "Implement new hooks",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    status: "To Do",
    priority: "Medium",
  },
  {
    id: "4",
    text: "Test application performance",
    createdAt: new Date().toISOString(),
    status: "To Do",
    priority: "High",
  },
  {
    id: "5",
    text: "Deploy to production",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    status: "To Do",
    priority: "Low",
  },
]

// Provider component
export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  // Memoize the context value to prevent unnecessary re-renders
  const tasksValue = useMemo(() => tasks, [tasks])

  return (
    <TasksContext.Provider value={tasksValue}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

// Custom hooks for consuming the context
export function useTasks() {
  const context = useContext(TasksContext)
  if (context === null) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext)
  if (context === null) {
    throw new Error("useTasksDispatch must be used within a TaskProvider")
  }
  return context
}

// Custom hook for task operations
export function useTaskOperations() {
  const dispatch = useTasksDispatch()

  const addTask = useCallback(
    (text, status, priority) => {
      dispatch({ type: "added", text, status, priority})
    },
    [dispatch],
  )

  const updateTask = useCallback(
    (id, updates) => {
      dispatch({ type: "changed", task: { ...updates, id } })
    },
    [dispatch],
  )

  const deleteTask = useCallback(
    (id) => {
      dispatch({ type: "deleted", id })
    },
    [dispatch],
  )

  return {
    addTask,
    updateTask,
    deleteTask
  }
}