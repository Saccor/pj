// App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Friends from "./Friends";
import NewHabit from "./NewHabit";

function App() {
  const [habits, setHabits] = useState([]);

  const handleAddHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route
            path="/habits"
            element={<NewHabit onAddHabit={handleAddHabit} />}
          />
        </Routes>
      </header>

      {/* Centered navigation */}
      <nav style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/habits">Habits</Link>
      </nav>
    </div>
  );
}

export default App;
