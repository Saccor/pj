// Habits.jsx
import React, { useState, useEffect } from 'react';
import NewHabit from './NewHabit';
import './Habits.css';

const Habits = ({ habits, onHabitsChange }) => {
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Save habits to local storage whenever habits state changes
    localStorage.setItem('habits', JSON.stringify(habits));
    // Notify the parent component about the change
    onHabitsChange(habits);
  }, [habits, onHabitsChange]);

  const updateStreak = (habitIndex, value) => {
    onHabitsChange((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[habitIndex].streak += value;
      return updatedHabits;
    });
  };

  const resetStreak = (habitIndex) => {
    onHabitsChange((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[habitIndex].streak = 0;
      return updatedHabits;
    });
  };

  const filterHabitsByPriority = (priority) => {
    setFilterPriority(priority);
  };

  const sortHabits = (sortBy) => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'desc' ? 'asc' : 'desc'));
    onHabitsChange((prevHabits) => {
      const sortedHabits = [...prevHabits];
      sortedHabits.sort((a, b) => {
        if (sortBy === 'streak') {
          return sortOrder === 'desc' ? b.streak - a.streak : a.streak - b.streak;
        } else if (sortBy === 'priority') {
          const priorityOrder = { low: 0, medium: 1, high: 2 };
          return sortOrder === 'desc'
            ? priorityOrder[b.priority] - priorityOrder[a.priority]
            : priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
      });
      return sortedHabits;
    });
  };

  const addHabit = (newHabit) => {
    onHabitsChange((prevHabits) => [...prevHabits, newHabit]);
  };

  const filteredHabits = habits.filter(
    (habit) => filterPriority === 'all' || habit.priority === filterPriority
  );

  return (
    <div className="habits-container">
      <h2>Habits Page</h2>

      {/* NewHabit form */}
      <div className="new-habit-form">
        <NewHabit onAddHabit={addHabit} />
      </div>

      {/* Displaying habits */}
      <div>
        <p>Created Habits:</p>
        <label>
          Filter by Priority:
          <select
            value={filterPriority}
            onChange={(e) => filterHabitsByPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <label>
          Sort by:
          <button onClick={() => sortHabits('streak')}>Streak {sortOrder === 'desc' ? '↓' : '↑'}</button>
          <button onClick={() => sortHabits('priority')}>Priority {sortOrder === 'desc' ? '↓' : '↑'}</button>
        </label>
        <br />

        <ul className="habits-list">
          {filteredHabits.map((habit, index) => (
            <li key={index}>
              {habit.title} - Streak: {habit.streak} - Priority: {habit.priority}
              <button onClick={() => updateStreak(index, 1)}>Increase Streak</button>
              <button onClick={() => updateStreak(index, -1)}>Decrease Streak</button>
              <button onClick={() => resetStreak(index)}>Reset Streak</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Save Habits button */}
      <button
        className="button save-button"
        onClick={() => alert('Habits saved!')} // Replace with your save logic
      >
        Save Habits
      </button>
    </div>
  );
};

export default Habits;
