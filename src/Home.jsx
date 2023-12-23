// Home.js

import React from "react";
import { Link } from "react-router-dom";

const Home = ({ top3Habits }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Home Page</h2>

      <h4>Recently added friends</h4>
      <Link to="/Friends" style={{ textDecoration: "none" }}>
        <button className="button">Go to Friends</button>
      </Link>

      {/* Add button for Habits */}
      <Link to="/Habits" style={{ textDecoration: "none", margin: "10px" }}>
        <button className="button">Habits</button>
      </Link>

      {/* Display top 3 habits */}
      <div>
        <h4>Top 3 Habits</h4>
        <ul>
          {top3Habits.map((habit, index) => (
            <li key={index}>
              <div>
                <strong>{habit.title}</strong>
                <p>Streak: {habit.streak}</p>
                <p>Priority: {habit.priority}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
