import { useEffect, useState } from "react"

const Home = () => {

const [users, setUsers] = useState([]);


const getUserData = async () => {
    let resUser = await fetch('https://randomuser.me/api');
    let jsonUser = await resUser.json();
    console.log(jsonUser.results)
    setUsers((prevUsers) => [...prevUsers, ...jsonUser.results])
} 

useEffect(() => {
getUserData();
},[])

const addFriend = () => {
    getUserData();
}

return(
    <div>
        <h3>Friends</h3>
        <ul className="container">
        {users.map((user) => (
            <li key={user.login.uuid}>
            <div>
            <img src={user.picture.large} alt="" width="150px" height="150px" />
            </div>
            <br />
            {user.name.title} {user.name.first} {user.name.last} 
            <br />
            <br />
            </li>
        ))}
        </ul>
        <button className="button" onClick={addFriend}>Lägg till ny vän</button>
    </div>
)
}
export default Home