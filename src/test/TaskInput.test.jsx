import { render, screen, fireEvent } from "@testing-library/react"
import TaskInput from "../component/TaskInput"
import { TaskProvider } from "../component/context/TaskContext"

describe("TaskInput", () => {
  test("renders input and button", () => {
    render(
      <TaskProvider>
        <TaskInput />
      </TaskProvider>
    )

    expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument()
  })

  test("allows entering text and submits correctly", () => {
    const textValue = "Write unit tests"

    render(
      <TaskProvider>
        <TaskInput />
      </TaskProvider>
    )

    const input = screen.getByPlaceholderText(/what needs to be done/i)
    const button = screen.getByRole("button", { name: /add task/i })

    fireEvent.change(input, { target: { value: textValue } })
    expect(input.value).toBe(textValue)

    fireEvent.click(button)
    expect(input.value).toBe("") // Input resets after submission
  })
})
