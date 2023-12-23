// TaskList.jsx
import React, { useState } from 'react';

const TaskList = ({ tasks, completeTask, removeTask, editTask, filterTasks, sortTasks }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortType, setSortType] = useState('title-asc');

  const filteredTasks = filterTasks(tasks, filterCategory);
  const sortedTasks = sortTasks(filteredTasks, sortType);

  return (
    <div>
      <h2>Task List</h2>

      {/* Filter and Sort Controls */}
      <div>
        <label>
          Filter by Category:
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="household">Household Chores</option>
            <option value="social">Social Activity</option>
            <option value="work">Work-related Task</option>
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="time-asc">Time Estimate (Low to High)</option>
            <option value="time-desc">Time Estimate (High to Low)</option>
          </select>
        </label>
      </div>

      {/* Task List */}
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>{task.description}</span>
            <span>Time Estimate: {task.timeEstimate} minutes</span>
            <span>Category: {task.taskType}</span>
            <span>
              <button onClick={() => completeTask(task.id)}>Complete</button>
              <button onClick={() => removeTask(task.id)}>Remove</button>
              <button onClick={() => editTask(task.id)}>Edit</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
