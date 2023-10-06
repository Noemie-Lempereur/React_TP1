import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App(initialTask = "", initialTasks =  [], initialCompletedTasks =  [], initialHeureTasks = [], initialTimerTasks = []) {

  initialTask = window.localStorage.getItem("task") || "";
  initialTasks = window.localStorage.getItem("tasks") || [];
  initialCompletedTasks = window.localStorage.getItem("completedTasks") || [];
  initialHeureTasks = window.localStorage.getItem("heureTasks") || [];

  if(initialTasks != "") initialTasks=initialTasks.split(",")
  else initialTasks = []

  if(initialCompletedTasks != "") initialCompletedTasks=initialCompletedTasks.split(",")
  else initialCompletedTasks = []

  if(initialHeureTasks != "") initialHeureTasks=initialHeureTasks.split(",")
  else initialHeureTasks = []

  if(initialTimerTasks != "") initialTimerTasks=initialTimerTasks.split(",")
  else initialTimerTasks = []

  const [tasks, setTasks] = React.useState(initialTasks);
  const [task, setTask] = React.useState(initialTask);
  const [completedTasks, setCompletedTasks] = React.useState(initialCompletedTasks);
  const [heureTasks, setHeureTasks] = React.useState(initialHeureTasks);
  const [timer, setTimer] = React.useState('');
  const [timerTasks, setTimerTasks] = React.useState(initialTimerTasks);

  React.useEffect(() => {
    window.localStorage.setItem("task", task);
  }, [task]);

  React.useEffect(() => {
    window.localStorage.setItem("tasks", tasks);
  }, [tasks]);

  React.useEffect(() => {
    window.localStorage.setItem("completedTasks", completedTasks);
  }, [completedTasks]);

  React.useEffect(() => {
    window.localStorage.setItem("heureTasks", heureTasks);
  }, [heureTasks]);

  React.useEffect(() => {
    window.localStorage.setItem("timerTasks", timerTasks);
  }, [timerTasks]);


  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (task.trim() !== '') {
      let timerFormatted = timer.trim() === '' ? "00:00" : timer;
      setTasks([...tasks, task]);
      setTimer('');
      setTimerTasks([...timerTasks, timerFormatted]);
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      setTasks([...tasks, task]);
      setTask('');
      setHeureTasks([...heureTasks, currentTime]);
      setCompletedTasks([...completedTasks, "0"]);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
    const updatedHeureTasks = heureTasks.filter((_, i) => i !== index);
    setHeureTasks(updatedHeureTasks);
  };

  const doneTask = (event,index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = event.target.checked ? "1" : "0";
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <>
    <div className="box">
        <p>You have {tasks.length} Todos</p>
          <table>   
          <tbody>
          {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task}</td>
            <td>{timerTasks[index]}</td>
            <td>
            <input type="checkbox" checked={completedTasks[index] === "1"} onChange={(event) => doneTask(event, index)} />
              <button onClick={() => removeTask(index)} className="circle-button">
              <span className="material-symbols-outlined">close</span>
              </button></td>
          </tr>
        ))}
          </tbody>
          </table>
          <div>
          <form onSubmit={addTask}>
          <input type="text" value={task} onChange={handleInputChange} placeholder="Enter item" />
          <input type="time" value={timer} onChange={(event) => setTimer(event.target.value)}/>
          <button onClick={addTask} className="submitButton">Submit</button>
          </form>
          </div>
        </div>
    </>
  )
}

export default App
