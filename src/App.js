import Home from './Home';
import { Routes, Route } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      </header>
    </div>
  );
}

export default App;
