import React, { useEffect, useState } from 'react';
import Axios from './Axios'
import './App.css';
import Todo from './components/Todo';


let App = (props) => {
  let [tasks, setTasks] = useState([])
  let [newTask, setNewTask] = useState('')
  let [shouldUpdate, setShouldUpdate] = useState(true);
  let [strike, setStrike] = useState('');


  useEffect(() => {
    if (!shouldUpdate) {
      return;
    }
    Axios.get("/task-list/").then((response) => {
      setTasks(response.data)
      setShouldUpdate(false)
    })
  }, [shouldUpdate])

  let handleChange = (e) => {
    let { value } = e.target;
    setNewTask(value);
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("/task-create/", {
        title: newTask,
      })
      setShouldUpdate(true)
      setNewTask("");
    }
    catch (err) {
      console.error(err)
    }
  }

  const submitEdit = async (task) => {
    try {
      await Axios.put(`/task-update/${task.id}`, {
        title: task.title
      })
      setShouldUpdate(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (task) => {
    try {
      await Axios.delete(`/task-delete/${task.id}`)
      setShouldUpdate(true);
    } catch (err) {
      console.error(err)
    }
  }

  const strikeUnstrike = async (task) => {
    try {
      task.completed = !task.completed
      const response = await Axios.put(`/task-update/${task.id}`, {
        completed: task.completed,
      })
      setStrike(response)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <div id="task-container">
        <div id="form-wrapper">
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div style={{ flex: 6 }}>
                <input value={newTask} onChange={handleChange} className="form-control" id="title" type="text" name="title" placeholder="Add task" />
              </div>
              <div style={{ flex: 1 }}>
                <input id="submit" className="btn btn-warning" type="submit" name="Add" />
              </div>
            </div>
          </form>
        </div>
        <div id="list-wrapper">
          {tasks.map((task, index) => {
            return <Todo
              key={index}
              task={task}
              strikeUnstrike={strikeUnstrike}
              submitEdit={submitEdit}
              handleDelete={handleDelete}>
            </Todo>
          })}
        </div>
      </div>
    </div >
  )
}

export default App;
