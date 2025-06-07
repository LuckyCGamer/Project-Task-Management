import TaskHeader from "./component/TaskHeader";
import TaskInput from "./component/TaskInput";
import { TaskProvider } from "./component/context/TaskContext";
import TaskList from "./component/TaskList";

function App() {

  return (
    <TaskProvider>
      <TaskHeader />

      <div className="container mx-auto px-4 py-8">
        <TaskInput />
        <TaskList />
      </div>

    </TaskProvider>
  )
}

export default App
