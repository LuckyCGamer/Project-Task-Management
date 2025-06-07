"use client"

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
          completed: false,
          createdAt: new Date().toISOString(),
          priority: action.priority || "medium",
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