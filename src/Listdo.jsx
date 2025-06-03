import React, { useState } from "react";
import './Listdo.css';

function Listdo() {
  const [tasks, setTasks] = useState(["kill a dog", "Kill a cat", "remove traces"]);
  const [newTask, setNewTask] = useState("");

  function HandleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
  }

  function moveUp(index) {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
      setTasks(updatedTask);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
      setTasks(updatedTask);
    }
  }

  return (
    <>
      <div className="Tlc">
        <div>
          <input
            type="text"
            placeholder="Enter your task"
            value={newTask}
            onChange={HandleInputChange}
          />
          <button type="button" className="add-btn" onClick={addTask}>Add</button>
        </div>
        <ol>
          {tasks.map((task, index) =>
            <li key={index}>
              <span className="taskName">{task}</span>
              <button className="Dlt" onClick={() => deleteTask(index)}>Delete</button>
              <button className="Up" onClick={() => moveUp(index)}>👆</button>
              <button className="Down" onClick={() => moveDown(index)}>👇</button>
            </li>
          )}
        </ol>
      </div>
    </>
  );
}

export default Listdo;
