import { Link } from "react-router-dom"
const Home = () => {
return(
    <div>
        <h2>Home Page</h2>

        <h4>Recently added friends</h4>
        <button className="button"><Link to="/Friends" style={{'textDecoration' : 'none'}}>Go to Friends</Link></button>
    </div>
)
}
export default Home