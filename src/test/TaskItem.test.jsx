// TaskItem.test.jsx
import { render, screen } from "@testing-library/react"
import TaskItem from "../component/TaskItem"  // adjust path if needed
import { TaskProvider } from "../component/context/TaskContext"  // adjust path if needed

describe("TaskItem component", () => {
  it("renders task text with correct priority styles", () => {
    const task = { text: "Test task"}

    render(
      <TaskProvider>
        <TaskItem task={task} />
      </TaskProvider>
    )

    const taskElement = screen.getByText(/Test task/i)
    expect(taskElement).toBeInTheDocument()
    // you can also check for class names or styles if needed
  })
})
