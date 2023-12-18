import { useEffect, useState } from "react"
import UserData from "./UserData";

const Home = () => {

const [users, setUsers] = useState([]);
const [usersData, setUsersData] = useState(null)


const fetchData = async () => {
    let resUser = await fetch('https://randomuser.me/api');
    let jsonUser = await resUser.json();
    console.log(jsonUser.results)
    setUsers((prevUsers) => [...prevUsers, ...jsonUser.results])
} 

useEffect(() => {
fetchData();
},[])

const addFriend = () => {
    fetchData();
}

const dataUsers = async (index) => {

    const selectedUser = users[index]
    setUsersData(selectedUser)

}


return(
    <div>
        <h3>Friends</h3>
        <ul className="container">
        {users.map((user, index) => (
            <li key={user.login.username}>
            <div>
            <img src={user.picture.large} alt="" width="150px" height="150px" />
            </div>
            <br />
            {user.name.title} {user.name.first} {user.name.last} 
            <br />
            <button className="button" onClick={() => dataUsers(index)}>Visa info</button>
            <br />
            </li>
        ))}
        </ul>
        {usersData.length > 0 && <UserData data={usersData} /> }
        <button className="button" onClick={addFriend}>Lägg till ny vän</button>
    </div>
)
}
export default Home