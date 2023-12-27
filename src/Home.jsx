import { Link } from "react-router-dom"
import './App.css';

const Home = ({recentFriends}) => {
return(
    <div>
        <h2>Home Page</h2>


        <h4>Recently added friends</h4>
        <div>
        <ul className="container">
        {recentFriends.map((friend) => (
        <li key={friend.name.first}>
        <div>
        <img src={friend.picture.large} alt="" width="150px" height="150px" style={{
            'borderRadius' : '70px'
        }}/>
        </div>
        <br />
        {friend.name.title} {friend.name.first} {friend.name.last} 
        <br />
        </li>
        ))}
        </ul>
        <Link to="/Friends" style={{'textDecoration' : 'none'}}>
        <button className="button">Go to Friends</button>
        </Link>
        </div>
    </div>
)
}
export default Home