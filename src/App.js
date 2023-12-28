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
    // Ladda habits från localstorage
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(savedHabits);
  }, []);

  // funktion som hanterar habits
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
          <Route path="/habits" element={<Habits habits={habits} onHabitsChange={handleHabitsChange} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
