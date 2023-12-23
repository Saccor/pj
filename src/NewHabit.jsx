import React, { useState } from "react";

const NewHabit = () => {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [streak, setStreak] = useState(0);
  const [priority, setPriority] = useState("low");

  const handleAddHabit = () => {
    const newHabit = {
      title,
      streak,
      priority,
    };
    setHabits((prevHabits) => [...prevHabits, newHabit]);

    // Reset form fields after adding a habit
    setTitle("");
    setStreak(0);
    setPriority("low");
  };

  const handleIncreaseStreak = (habitIndex) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) =>
        index === habitIndex ? { ...habit, streak: habit.streak + 1 } : habit
      )
    );
  };

  const handleDecreaseStreak = (habitIndex) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) =>
        index === habitIndex ? { ...habit, streak: Math.max(0, habit.streak - 1) } : habit
      )
    );
  };

  const handleResetStreak = (habitIndex) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) =>
        index === habitIndex ? { ...habit, streak: 0 } : habit
      )
    );
  };

  const handleFilterByPriority = (selectedPriority) => {
    setHabits((prevHabits) =>
      selectedPriority === "all"
        ? prevHabits
        : prevHabits.filter((habit) => habit.priority === selectedPriority)
    );
  };

  const handleSortByStreak = (order) => {
    setHabits((prevHabits) =>
      [...prevHabits].sort((a, b) => (order === "asc" ? a.streak - b.streak : b.streak - a.streak))
    );
  };

  const handleSortByPriority = (order) => {
    setHabits((prevHabits) =>
      [...prevHabits].sort((a, b) => (order === "asc" ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority)))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Create a New Habit</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Start Streak:
        <input
          type="number"
          value={streak}
          onChange={(e) => setStreak(parseInt(e.target.value))}
        />
      </label>
      <br />
      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <br />
      <button onClick={handleAddHabit}>Add Habit</button>

      {/* Display Habits */}
      <div>
        <h2>Habits</h2>
        <label>
          Filter by Priority:
          <select onChange={(e) => handleFilterByPriority(e.target.value)}>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button onClick={() => handleSortByStreak("asc")}>Sort by Streak (Low to High)</button>
        <button onClick={() => handleSortByStreak("desc")}>Sort by Streak (High to Low)</button>
        <button onClick={() => handleSortByPriority("asc")}>Sort by Priority (Low to High)</button>
        <button onClick={() => handleSortByPriority("desc")}>Sort by Priority (High to Low)</button>

        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              <div>
                <strong>{habit.title}</strong>
                <p>Streak: {habit.streak}</p>
                <p>Priority: {habit.priority}</p>
              </div>
              <button onClick={() => handleIncreaseStreak(index)}>Increase Streak</button>
              <button onClick={() => handleDecreaseStreak(index)}>Decrease Streak</button>
              <button onClick={() => handleResetStreak(index)}>Reset Streak</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewHabit;
