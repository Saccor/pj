// Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>

      <h4>Recently added friends</h4>
      <Link to="/Friends" style={{ 'textDecoration': 'none' }}>
        <button className="button">Go to Friends</button>
      </Link>

      <h4>Tasks Management</h4>
      <Link to="/newTask" style={{ 'textDecoration': 'none' }}>
        <button className="button">Create New Task</button>
      </Link>
      <br />
      <Link to="/tasks" style={{ 'textDecoration': 'none' }}>
        <button className="button">View Tasks</button>
      </Link>
    </div>
  );
};

export default Home;
