import { render, screen, fireEvent } from "@testing-library/react"
import TaskItem from "../component/TaskItem"
import { TaskProvider, useTasks } from "../component/context/TaskContext"

function TaskItemWithContext() {
    const tasks = [
        {
            id: "1",
            text: "Learn React 19 features",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: "Pending",
        },
    ]
    return tasks.length ? <TaskItem task={tasks[0]} /> : null
}

describe("TaskItem component", () => {
    it("input and select reflect value changes", () => {
        render(
            <TaskProvider>
                <TaskItemWithContext />
            </TaskProvider>
        )

        // Click to enter edit mode
        fireEvent.click(screen.getByText(/Learn React 19 features/i))

        // Change name
        const input = screen.getByPlaceholderText("Task name")
        fireEvent.change(input, { target: { value: "Updated Task" } })
        expect(input.value).toBe("Updated Task")

        // Change status
        const select = screen.getByDisplayValue("Pending")
        fireEvent.change(select, { target: { value: "In Progress" } })
        expect(select.value).toBe("In Progress")
    })
})