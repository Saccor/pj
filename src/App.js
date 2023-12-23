// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Friends from './Friends';
import Home from './Home';
import './App.css';

function App() {
  // State for tasks
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to mark a task as completed
  const completeTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)));
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to edit a task
  const editTask = (editedTask) => {
    setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
  };

  // Function to filter tasks based on category
  const filterTasks = (tasks, category) => {
    if (category === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.taskType === category);
  };

  // Function to sort tasks
  const sortTasks = (tasks, sortType) => {
    // Implement sorting logic based on sortType
    return tasks.sort((a, b) => {
      if (sortType === 'title-asc' || sortType === 'title-desc') {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (sortType === 'title-asc') {
          return titleA.localeCompare(titleB);
        } else {
          return titleB.localeCompare(titleA);
        }
      } else if (sortType === 'time-asc' || sortType === 'time-desc') {
        if (sortType === 'time-asc') {
          return a.timeEstimate - b.timeEstimate;
        } else {
          return b.timeEstimate - a.timeEstimate;
        }
      }
      // Add more sorting options as needed
      return 0;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route
            path="/newTask"
            element={<NewTaskForm addTask={addTask} />}
          />
          <Route
            path="/tasks"
            element={
              <TaskList
                tasks={tasks}
                completeTask={completeTask}
                removeTask={removeTask}
                editTask={editTask}
                filterTasks={filterTasks}
                sortTasks={sortTasks}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;