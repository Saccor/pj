import React, { useState, useEffect } from 'react';
import './NewTask.css'; 

function NewTask({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeEstimate, setTimeEstimate] = useState(0);
  const [taskType, setTaskType] = useState('');
  const [suggestedActivity, setSuggestedActivity] = useState('');

  useEffect(() => {
    async function fetchSuggestedActivity() {
      try {
        const response = await fetch('https://www.boredapi.com/api/activity');
        const data = await response.json();
        setSuggestedActivity(data.activity);
        setTitle(data.activity);
      } catch (error) {
        console.error('Error fetching suggested activity:', error);
      }
    }

    fetchSuggestedActivity();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: new Date().getTime(),
      title,
      description,
      timeEstimate,
      taskType,
      completed: false,
    };

    addTask(newTask);
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Time Estimate (in minutes):
          <input
            type="number"
            value={timeEstimate}
            onChange={(e) => setTimeEstimate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Task Type:
          <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
            <option value="household">Household Chores</option>
            <option value="social">Social Activity</option>
            <option value="work">Work-related Task</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default NewTask;
