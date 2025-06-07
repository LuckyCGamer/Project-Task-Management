import { useState } from "react"
import { useTaskOperations } from "./context/TaskContext"

export default function TaskItem({ task, className, style }) {
  
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900",
    medium:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-900",
    low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900",
  }

  return (
    <div
      className={`group flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-input hover:shadow-sm transition-all duration-200 bg-card ${className}`}
      style={style}
    >

      <div className="flex-1 min-w-0">
          <div>
            <p className={`text-sm font-medium transition-all duration-200 `}>
              {task.text}
            </p>
          </div>
        
      </div>
    </div>
  )
}
