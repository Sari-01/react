import { useState } from 'react';
import './App.css';
import { FaCheckSquare, FaPlus, FaRegSquare, FaTimesCircle } from 'react-icons/fa';


function App() {
  const [task, setTask] = useState("")
  const [addTask, setAddTask] = useState([])

  function handleTask() {
    if (task.trim() !== "") {
      setAddTask([...addTask, { text: task, status: "empty" }])
      setTask("")
    }
  }
  const toggleTask = (index) => {
    setAddTask((prevTasks) =>
      prevTasks.map((tasks, i) => i === index ? { ...tasks, status: tasks.status === 'empty' ? "completed" : tasks.status === "completed" ? "wrong" : "empty" } : tasks)
    )
  }

  return (
    <div className="App">
      <h1>To-Do-List</h1><br /><br />
      <input type='text' placeholder='Type your works to add into the list' value={task} onChange={(e) => setTask(e.target.value)} />
      <FaPlus className='add-icons' onClick={handleTask} /><br /><br />
      <h2>The To-do-List</h2>
      {/* <ul> */}
      {addTask.map((task, index) => (
        <div key={index}>
          {task.status === 'empty' && (<FaRegSquare className='add-square' onClick={() => { toggleTask(index) }} />)}
          {task.status === 'completed' && (<FaCheckSquare className='add-check' onClick={() => { toggleTask(index) }} />)}
          {task.status === 'wrong' && (<FaTimesCircle className='add-circle' onClick={() => { toggleTask(index) }} />)}
          {task.text}
        </div>
      ))}
      {/* </ul> */}
    </div>
  );
}

export default App;
