import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskSet from "./components/TaskSet";
import About from "./components/About";

function App() {
  const name = "Task tracker";
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])
  
  const fetchTasks = async () =>{
    const res = await fetch(`http://localhost:5000/tasks`);
    const data = await res.json()

    return data;
  }

  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()

    return data;
  }

  const addTask = async (task) =>{
    /*const id = Math.floor(Math.random() * 1000) + 1;
    const newTasks = { id,...task }
    setTasks([...tasks, newTasks]);*/
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    setTasks([...tasks, data])
  }


  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id));
  }
  const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method:'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updTask),
      })
      const data = await res.json()


    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task));
  }

  const toggleAddTask = () =>{
    setShowAddTask(!showAddTask);
  }


  return (
     <div className="container">
       <BrowserRouter>
        <h2><Header tittle={name} showAddTask={toggleAddTask} taskState={showAddTask}/></h2>
       
          <Routes>
            <Route path='/' element={ <TaskSet addTask={addTask} tasks={tasks}
             toggleReminder={toggleReminder} deleteTask={deleteTask} showAddTask={showAddTask}/>
            }
             />
              <Route path='/about' element={ <About/> }/>
          </Routes>
        <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
