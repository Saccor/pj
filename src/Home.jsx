import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
    </div>
  );
};

export default Home;
