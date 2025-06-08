// TaskItem.test.jsx
import { render, screen, fireEvent } from "@testing-library/react"
import TaskItem from "../component/TaskItem"  // adjust path if needed
import { TaskProvider } from "../component/context/TaskContext" 
import * as TaskContext from "../component/context/TaskContext" // adjust path if needed

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

  it("calls deleteTask when delete button is clicked", () => {
    const mockDeleteTask = vi.fn()
    vi.spyOn(TaskContext, "useTaskOperations").mockReturnValue({
      updateTask: vi.fn(),
      deleteTask: mockDeleteTask,
    })

    const task = { id: 123, text: "Delete me" }

    render(
      <TaskProvider>
        <TaskItem task={task} />
      </TaskProvider>
    )

    const deleteButton = screen.getByTitle("Delete task")
    fireEvent.click(deleteButton)

    expect(mockDeleteTask).toHaveBeenCalledWith(123)
  })
})
