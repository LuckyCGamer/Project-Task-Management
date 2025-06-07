// test.jsx
import React from "react"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import TaskList from "./TaskList"
import { TaskProvider } from "./context/TaskContext"

// Helper to wrap TaskList with provider and mocked context
const renderWithTasks = (tasks = []) => {
  const MockProvider = ({ children }) => (
    <TaskProvider value={{ tasks }}>{children}</TaskProvider>
  )

  return render(<TaskList />, { wrapper: MockProvider })
}

describe("TaskList", () => {
  test("displays 'No tasks found' when task list is empty", () => {
    renderWithTasks([])

    expect(screen.getByText("No tasks found")).toBeInTheDocument()
    expect(screen.getByText("Start by adding your first task above")).toBeInTheDocument()
  })

  test("displays tasks when task list is not empty", () => {
    const tasks = [
      { id: 1, title: "Task One", completed: false },
      { id: 2, title: "Task Two", completed: true },
    ]

    renderWithTasks(tasks)

    expect(screen.getByText("Tasks (2)")).toBeInTheDocument()
    expect(screen.getByText("Task One")).toBeInTheDocument()
    expect(screen.getByText("Task Two")).toBeInTheDocument()
  })
})