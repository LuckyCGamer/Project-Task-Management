import { useState } from "react"

import TaskHeader from "./component/TaskHeader";
import TaskInput from "./component/TaskInput";
import { TaskProvider } from "./component/context/TaskContext";
import TaskList from "./component/TaskList";
import TaskFilters from "./component/TaskFilters";
import TaskFilterPriority from "./component/TaskFilterPriority";

function App() {

  const [filter, setFilter] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  return (
    <TaskProvider>
      <TaskHeader />

      <div className="container mx-auto px-4 py-8">
        <TaskInput />
        <TaskFilterPriority filter={filterPriority} onFilterChange={setFilterPriority} />
        <TaskFilters filter={filter} onFilterChange={setFilter}/>
        <TaskList filter={filter} sortPriority={filterPriority}/>
      </div>

    </TaskProvider>
  )
}

export default App
