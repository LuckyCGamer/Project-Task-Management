import { TaskProvider } from "./component/context/TaskContext";
import TaskHeader from "./component/TaskHeader";
import TaskInput from "./component/TaskInput";

function App() {

  return (
    <TaskProvider>
      <TaskHeader />

      <div className="container mx-auto px-4 py-8">
        <TaskInput />
      </div>
      
    </TaskProvider>
  )
}

export default App
