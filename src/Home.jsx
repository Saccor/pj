import { Link } from "react-router-dom"
const Home = ({}) => {
return(
    <div>
        <h2>Home Page</h2>

        <h4>Recently added friends</h4>
        <Link to="/Friends" style={{'textDecoration' : 'none'}}>
        <button className="button">Go to Friends</button>
        </Link>
    </div>
)
}
export default Home