// App.jsx
import Friends from './Friends';
import Home from './Home';
import Habits from './Habits';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recentFriends, setRecentFriends] = useState([]);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // Load habits from local storage on component mount
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(savedHabits);
  }, []);

  // Define a function to handle habits change
  const handleHabitsChange = (updatedHabits) => {
    setHabits(updatedHabits);
  };

  const myLatestFriends = (myFriends) => {
    setRecentFriends(myFriends);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home recentFriends={recentFriends} habits={habits} />} />
          <Route path="/Friends" element={<Friends myLatestFriends={myLatestFriends} />} />
          {/* Pass onHabitsChange prop to Habits component */}
          <Route path="/habits" element={<Habits habits={habits} onHabitsChange={handleHabitsChange} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
