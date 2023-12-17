import { useEffect, useState } from "react"

const Home = () => {

const [users, setUsers] = useState([]);

useEffect(() => {

const getUserData = async () => {
    let resUser = await fetch('https://randomuser.me/api');
    let jsonUser = await resUser.json();
    console.log(jsonUser)
    setUsers(jsonUser.results)
} 

getUserData();
},[])

return(
    <div>
        <h3>User</h3>
        <ul>
        {users.map((user) => (
            <li key={user.login.uuid}>
            <div>
            <img src={user.picture.large} alt="" width="100%" height="100%" />
            </div>
            <br />
            {user.name.title} {user.name.first} {user.name.last} 
            <br />
            <br />
            <button className="button">Lägg till ny vän</button>
            </li>
        ))}
        </ul>
    </div>
)
}
export default Home