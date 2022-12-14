import { useState , useEffect} from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const[tasks, setTasks] = useState([])

  //fetch tasks from json database
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, [])

  //fetch all tasks from json database
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //func to add a task to json database
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  //func to delete a task from json database
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    
    setTasks(tasks.filter((task) => task.id !== id))
  }

  
  //fetch a single task for the toggle thing
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //func for double click
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        
        <Header title='Task Tracker' showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)}/>
        
        <Routes>
          <Route path='/' element = {
            <>
              {showAddTask===true && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks to show :)')}
            </>
          }/>
          <Route path='/about' element={<About/>}/>
        </Routes>

        <Footer/>

      </div>
    </Router>
  );
}

export default App;
