export default function TaskFilters({ filter, onFilterChange }) {

  const filters = [
    { key: "all", label: "Created At" },
    { key: "high_low", label: "High-Low" },
    { key: "low_high", label: "Low-High"},
  ]

  return (
    <div className="flex rounded-md shadow-sm mt-4">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onFilterChange(key)}
          className={`flex-1 px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md border-y border-r first:border-l cursor-pointer ${
            filter === key
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-input hover:bg-muted"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
