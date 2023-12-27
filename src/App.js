// App.js

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Friends from "./Friends";
import NewHabit from "./NewHabit";

function App() {
  const [habits, setHabits] = useState([]);
  const [top3Habits, setTop3Habits] = useState([]);

  const handleAddHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);

    // Update top 3 habits
    setTop3Habits((prevTop3Habits) => {
      const updatedTop3Habits = [...prevTop3Habits, newHabit].sort((a, b) =>
        b.priority.localeCompare(a.priority)
      ).slice(0, 3);

      return updatedTop3Habits;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={<Home top3Habits={top3Habits} />}
          />
          <Route path="/friends" element={<Friends />} />
          <Route
            path="/habits"
            element={<NewHabit onAddHabit={handleAddHabit} />}
          />
        </Routes>
      </header>

      <nav style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/habits">Habits</Link>
      </nav>
    </div>
  );
}

export default App;
