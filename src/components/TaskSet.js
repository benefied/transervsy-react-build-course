import Tasks from "./Tasks"
import AddTask from "./AddTask"


const TaskSet = ({addTask, tasks, toggleReminder, deleteTask, showAddTask}) => {
  return (
    <div>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "Add a task"}
    </div>
  )
}

export default TaskSet