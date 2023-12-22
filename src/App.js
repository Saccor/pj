import Friends from './Friends';
import Home from './Home';
import UserData from './UserData';
import { Routes, Route } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Friends' element={<Friends />}/>
      </Routes>
      </header>
    </div>
  );
}

export default App;
