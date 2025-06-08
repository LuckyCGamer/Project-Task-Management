import { useState } from "react"

import TaskHeader from "./component/TaskHeader";
import TaskInput from "./component/TaskInput";
import { TaskProvider } from "./component/context/TaskContext";
import TaskList from "./component/TaskList";
import TaskFilters from "./component/TaskFilters";

function App() {

  const [filter, setFilter] = useState("all")

  return (
    <TaskProvider>
      <TaskHeader />

      <div className="container mx-auto px-4 py-8">
        <TaskInput />
        <TaskFilters filter={filter} onFilterChange={setFilter}/>
        <TaskList filter={filter}/>
      </div>

    </TaskProvider>
  )
}

export default App
