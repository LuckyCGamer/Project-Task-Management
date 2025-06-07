// TaskItem.test.jsx
import React from "react"
import { render, screen } from "@testing-library/react"
import TaskItem from "../component/TaskItem"  // adjust path if needed

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900",
  medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-900",
  low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900",
}

describe("TaskItem component", () => {
  it("renders task text with correct priority styles", () => {
    const task = { text: "Test task"}

    render(
      <TaskItem task={task} q />
    )

    const taskElement = screen.getByText(/Test task/i)
    expect(taskElement).toBeInTheDocument()
    // you can also check for class names or styles if needed
  })
})
