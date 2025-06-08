import { useTasks } from "./context/TaskContext"

export default function TaskFilters({ filter, onFilterChange }) {
  const tasks = useTasks()

  const counts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status == "To Do").length,
    inprogress: tasks.filter((t) => t.status == "In Progress").length,
    done: tasks.filter((t) => t.status == "Done").length,
  }

  const filters = [
    { key: "all", label: "All" },
    { key: "todo", label: "To Do" },
    { key: "inprogress", label: "In Progress"},
    { key: "done", label: "Done" },
  ]

  return (
    <div className="flex rounded-md shadow-sm mt-4">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex-1 px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md border-y border-r first:border-l cursor-pointer ${
            filter === key
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-input hover:bg-muted"
          }`}
        >
          {label}
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-background/20">{counts[key]}</span>
        </button>
      ))}
    </div>
  )
}
