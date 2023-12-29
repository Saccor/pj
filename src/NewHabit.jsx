// NewHabit.jsx
import React, { useState } from 'react';

const NewHabit = ({ onAddHabit }) => {
  const [title, setTitle] = useState('');
  const [streak, setStreak] = useState(0);
  const [priority, setPriority] = useState('low');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStreakChange = (e) => {
    setStreak(parseInt(e.target.value, 10));
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new habit object
    const newHabit = {
      title,
      streak,
      priority,
    };

    // Pass the new habit to the parent component
    onAddHabit(newHabit);

    // Reset form fields
    setTitle('');
    setStreak(0);
    setPriority('low');
  };

  return (
    <div>
      <h2 style={{ fontSize: '18px', color: '#555', marginBottom: '10px', fontWeight: 'normal' }}>Create a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} required />
        </label>
        <br />
        <label>
          Start Streak:
          <input type="number" value={streak} onChange={handleStreakChange} required />
        </label>
        <br />
        <label>
          Priority:
          <select value={priority} onChange={handlePriorityChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default NewHabit;