import { render, screen, fireEvent } from "@testing-library/react"
import TaskFilters from "../component/TaskFilters"
import * as TaskContext from "../component/context/TaskContext"
import React from "react"

describe("TaskFilters", () => {
  const mockTasks = [
    { id: 1, status: "To Do" },
    { id: 2, status: "In Progress" },
    { id: 3, status: "Done" },
    { id: 4, status: "To Do" },
  ]

  beforeEach(() => {
    vi.spyOn(TaskContext, "useTasks").mockReturnValue(mockTasks)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders all filter buttons with correct counts", () => {
    render(<TaskFilters filter="all" onFilterChange={() => {}} />)
    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("To Do")).toBeInTheDocument()
    expect(screen.getByText("In Progress")).toBeInTheDocument()
    expect(screen.getByText("Done")).toBeInTheDocument()
    expect(screen.getByText("4")).toBeInTheDocument() // All
    expect(screen.getByText("2")).toBeInTheDocument() // To Do
    expect(screen.getAllByText("1")).toHaveLength(2)
  })

  it("calls onFilterChange with correct key when a button is clicked", () => {
    const onFilterChange = vi.fn()
    render(<TaskFilters filter="all" onFilterChange={onFilterChange} />)
    fireEvent.click(screen.getByText("To Do"))
    expect(onFilterChange).toHaveBeenCalledWith("todo")
    fireEvent.click(screen.getByText("In Progress"))
    expect(onFilterChange).toHaveBeenCalledWith("inprogress")
    fireEvent.click(screen.getByText("Done"))
    expect(onFilterChange).toHaveBeenCalledWith("done")
  })

  it("applies active styles to the selected filter", () => {
    render(<TaskFilters filter="inprogress" onFilterChange={() => {}} />)
    const inProgressBtn = screen.getByText("In Progress").closest("button")
    expect(inProgressBtn).toHaveClass("bg-primary")
  })
})