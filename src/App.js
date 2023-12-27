import Friends from './Friends';
import Home from './Home';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import './App.css';
function App() {

const [recentFriends, setRecentFriends] = useState([])

const myLatestFriends = (myFriends) => {
  setRecentFriends(myFriends)
}

  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path='/' element={<Home recentFriends={recentFriends} />}/>
        <Route path='/Friends' element={<Friends myLatestFriends={myLatestFriends} />}/>
      </Routes>
      </header>
    </div>
  );
}

export default App;
