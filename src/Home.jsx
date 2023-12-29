import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = ({ habits }) => {
  const topHabits = habits
    ? habits.sort((a, b) => b.priority - a.priority).slice(0, 3)
    : [];

    const getLocal = localStorage.getItem("TEST");
    const storedUser = getLocal ? JSON.parse(getLocal) : [];
    // console.log('storedUser', storedUser)
    
  return (
    <div>
      <h2>Home Page</h2>

      <h4>Recently added friends</h4>
      <div>
        <ul className="container">
          {storedUser.slice(-5).map((friend) => (
            <li key={friend.name.first}>
              <div>
                <img
                  src={friend.picture.large}
                  alt=""
                  width="150px"
                  height="150px"
                  style={{
                    borderRadius: '70px',
                  }}
                />
              </div>
              <br />
              {friend.name.title} {friend.name.first} {friend.name.last}
              <br />
            </li>
          ))}
        </ul>
        <Link to="/Friends" style={{ textDecoration: 'none' }}>
          <button className="button">Go to Friends</button>
        </Link>
      </div>

      <h4>Top 3 Habits</h4>
      <ul className="container">
        {topHabits.map((habit, index) => (
          <li key={index}>
            {habit.title} - Streak: {habit.streak} - Priority: {habit.priority}
          </li>
        ))}
      </ul>

      <Link to="/habits" style={{ textDecoration: 'none' }}>
        <button className="button">See more</button>
      </Link>
    </div>
  );
};

export default Home;
