// TaskList.jsx
import React, { useState } from 'react';

const TaskList = ({ tasks, completeTask, removeTask, editTask, filterTasks, sortTasks }) => {
  // Assuming filterCategory and sortType are passed as props or defined within the component
  const filterCategory = 'all'; // Set your default value
  const sortType = 'title-asc'; // Set your default value

  const filteredTasks = filterTasks(tasks, filterCategory);
  const sortedTasks = sortTasks(filteredTasks, sortType);

  const [editedTask, setEditedTask] = useState(null);

  // State for editing form fields
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTimeEstimate, setEditTimeEstimate] = useState(0);
  const [editTaskType, setEditTaskType] = useState('');

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    // Create the edited task object with the updated data
    const updatedTask = {
      ...editedTask,
      title: editTitle,
      description: editDescription,
      timeEstimate: editTimeEstimate,
      taskType: editTaskType,
    };

    // Call the editTask function to update the task
    editTask(updatedTask);

    // Clear the editing form fields and reset the editedTask state
    setEditTitle('');
    setEditDescription('');
    setEditTimeEstimate(0);
    setEditTaskType('');
    setEditedTask(null);
  };

  const handleCompleteTask = (taskId) => {
    // Call the completeTask function to mark the task as completed
    completeTask(taskId);
  };

  return (
    <div>
      <h2>Task List</h2>

      {/* Filter and Sort Controls */}
      {/* ... (previous code) */}

      {/* Task List */}
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>{task.description}</span>
            <span>Time Estimate: {task.timeEstimate} minutes</span>
            <span>Category: {task.taskType}</span>
            <span>
              <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
              <button onClick={() => removeTask(task.id)}>Remove</button>
              <button
                onClick={() => {
                  setEditedTask(task);
                  setEditTitle(task.title);
                  setEditDescription(task.description);
                  setEditTimeEstimate(task.timeEstimate);
                  setEditTaskType(task.taskType);
                }}
              >
                Edit
              </button>
            </span>
          </li>
        ))}
      </ul>

      {/* Optional: Display an editing form */}
      {editedTask && (
        <div>
          <h3>Edit Task</h3>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              Title:
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </label>
            <br />
            <label>
              Description:
              <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            </label>
            <br />
            <label>
              Time Estimate (in minutes):
              <input
                type="number"
                value={editTimeEstimate}
                onChange={(e) => setEditTimeEstimate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Task Type:
              <select value={editTaskType} onChange={(e) => setEditTaskType(e.target.value)}>
                <option value="household">Household Chores</option>
                <option value="social">Social Activity</option>
                <option value="work">Work-related Task</option>
              </select>
            </label>
            <br />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;
