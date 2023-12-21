import { useEffect, useState } from "react"
import UserData from "./UserData";

const Home = () => {

const [users, setUsers] = useState([]);
const [usersData, setUsersData] = useState(null)
const [filter, setFilter] = useState({
    gender: null, 
    maxAge : null, 
    minAge : null,
    firstName : null,
    lastName : null 
})

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

const dataUsers = (index) => {

    const selectedUser = users[index]
    setUsersData(selectedUser)

}

const myGender = (e) => {
    setFilter({ gender: e.target.value })
}
const myMaxAge = (e) => {
    setFilter({ maxAge: +e.target.value })
}
const myMinAge = (e) => {
    setFilter({ minAge: +e.target.value })
}
const myFirstName = (e) => {
    setFilter({ firstName: e.target.value })
}
const myLastName = (e) => {
    setFilter({ lastName: e.target.value })
}

const userFilter = () => {
    return users.filter((user) => 
    (user.gender === filter.gender || !filter.gender) &&
    (user.dob.age <= filter.maxAge || !filter.maxAge) && 
    (user.dob.age >= filter.minAge || !filter.minAge) &&
    (user.name.first === filter.firstName || !filter.firstName) &&
    (user.name.last === filter.lastName || !filter.lastName)
    )
}

return(
<div>
<h2>Filter user</h2>
<label>
Förnamn
<select name="firstName" onChange={myFirstName}>
    <option value="">Alla</option>
    {users.map((user,index) => (
        <option key={index} value={user.name.first} >
            {user.name.first}
        </option>
    ))}
</select>
</label>
<br />
<label>
Förnamn
<select name="lasttName" onChange={myLastName}>
    <option value="">Alla</option>
    {users.map((user,index) => (
        <option key={index} value={user.name.last} >
            {user.name.last}
        </option>
    ))}
</select>
</label>
<br />
<label>
Kön- 
<select name="gender" onChange={myGender}>
<option value="">Alla</option>
<option value="male">Man</option>
<option value="female">Kvinna</option>
</select>
</label>
<br />
<label>
Max ålder-
<input type="number" max="0" onChange={myMaxAge} />
</label>
<br />
<label>
Min ålder-
<input type="number" min="0" onChange={myMinAge} />
</label>
        <h3>Friends</h3>
        <ul className="container">
        {userFilter().map((user, index) => (
            <li key={user.login.username}>
            <div>
            <img src={user.picture.large} alt="" width="150px" height="150px" />
            </div>
            <br />
            {user.name.title} {user.name.first} {user.name.last} 
            <br />
            <button className="button" onClick={() => dataUsers(index)}>Visa info</button>
            <br />
            {usersData === user && <UserData data={user} /> }
            </li>
        ))}
        </ul>
        <button className="button" onClick={addFriend}>Lägg till ny vän</button>
    </div>
)
}
export default Home