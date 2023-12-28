// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = ({ recentFriends, habits }) => {
  // Check if habits is defined before sorting
  const topHabits = habits
    ? habits.sort((a, b) => b.priority - a.priority).slice(0, 3)
    : [];

  return (
    <div>
      <h2>Home Page</h2>

      <h4>Recently added friends</h4>
      {/* Display recent friends */}
      <div>
        <ul className="container">
          {recentFriends.map((friend) => (
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

      {/* Display top three habits */}
      <h4>Top 3 Habits</h4>
      <ul className="container">
        {topHabits.map((habit, index) => (
          <li key={index}>
            {habit.title} - Streak: {habit.streak} - Priority: {habit.priority}
          </li>
        ))}
      </ul>

      {/* "See more" link */}
      <Link to="/habits" style={{ textDecoration: 'none' }}>
        <button className="button">See more</button>
      </Link>
    </div>
  );
};

export default Home;
