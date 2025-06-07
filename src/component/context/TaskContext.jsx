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
  {
    id: "1",
    text: "Learn React 19 features",
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    priority: "high",
  },
  {
    id: "2",
    text: "Update project dependencies",
    completed: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    priority: "medium",
  },
  {
    id: "3",
    text: "Implement new hooks",
    completed: false,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    priority: "high",
  },
  {
    id: "4",
    text: "Test application performance",
    completed: false,
    createdAt: new Date().toISOString(),
    priority: "low",
  },
  {
    id: "5",
    text: "Deploy to production",
    completed: true,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    priority: "medium",
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
    (text, priority = "medium") => {
      dispatch({ type: "added", text, priority })
    },
    [dispatch],
  )

  const updateTask = useCallback(
    (task) => {
      dispatch({ type: "changed", task })
    },
    [dispatch],
  )

  const deleteTask = useCallback(
    (id) => {
      dispatch({ type: "deleted", id })
    },
    [dispatch],
  )

  const toggleTaskCompletion = useCallback(
    (task) => {
      dispatch({
        type: "changed",
        task: { ...task, completed: !task.completed },
      })
    },
    [dispatch],
  )

  const toggleAllTasks = useCallback(() => {
    dispatch({ type: "toggle_all" })
  }, [dispatch])

  const clearCompletedTasks = useCallback(() => {
    dispatch({ type: "clear_completed" })
  }, [dispatch])

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleAllTasks,
    clearCompletedTasks,
  }
}
