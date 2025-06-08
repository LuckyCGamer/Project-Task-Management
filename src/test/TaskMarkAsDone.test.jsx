import { render, screen, fireEvent } from "@testing-library/react"
import TaskItem from "../component/TaskItem"
import * as TaskContext from "../component/context/TaskContext"

describe("TaskItem", () => {
  it("calls toggleTaskCompletion when checkbox is clicked", () => {
    // Create a mock function
    const toggleTaskCompletion = vi.fn()
    // Mock the context hook to return the mock function
    vi.spyOn(TaskContext, "useTaskOperations").mockReturnValue({
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleTaskCompletion,
    })

    const task = {
      id: 1,
      text: "Test Task",
      completed: false,
      description: "desc",
      status: "To Do",
      priority: "Low",
    }

    render(<TaskItem task={task} />)

    const checkbox = screen.getByTitle("Mark as done")
    fireEvent.click(checkbox)

    expect(toggleTaskCompletion).toHaveBeenCalledWith(task)
  })
})