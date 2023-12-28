import { useEffect, useState } from "react"
import UserData from "./UserData";
import { Link } from "react-router-dom";
const Friends = ({ myLatestFriends}) => {
    const [originalUsers, setOriginalUsers] = useState([])
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([])
    const [latestUserData, setLatestUserData] = useState([])
    const [usersData, setUsersData] = useState(null)
    const [filter, setFilter] = useState({ 
        gender: '', 
        maxAge : null, 
        minAge : null,
        firstName : null,
        lastName : null 
    })
    
const fetchData = async () => { //Fetchar datan och lägger i user
    let resUser = await fetch('https://randomuser.me/api');
    let jsonUser = await resUser.json();
    setUsers((prevUsers) => [...prevUsers,...jsonUser.results]) 
    console.log(jsonUser.results) 
} 

useEffect(() => {
fetchData()
},[])

useEffect(() => {
    const latestFriends = users.slice(-5);
    setOriginalUsers(latestFriends);
},[users])

const addFriend = () => {
    fetchData();
}

const dataUsers = (index) => {
    const selectedUser = filteredUsers[index]
    setUsersData(selectedUser)
}
const getStoreUsers = () => {
    const storedUsers = localStorage.getItem("latestUsersData");
    return storedUsers ? JSON.parse(storedUsers) : [];
}

useEffect(() => {
    const storedUsers = getStoreUsers();
    setLatestUserData(storedUsers)
    myLatestFriends(storedUsers)
},[])

//Olika funktioner för filtrering
const myGender = (e) => {
    setFilter(prevFilter => ({ ...prevFilter, gender: e.target.value  }))
}
const myMaxAge = (e) => {
    setFilter(prevFilter => ({ ...prevFilter, maxAge: +e.target.value }))
}
const myMinAge = (e) => {
    setFilter(prevFilter => ({ ...prevFilter, minAge: +e.target.value }))
}
const sortByFirst = () => { //Dessa funktioner sorterar
    setUsers((prevUsers) => [...prevUsers].sort((a,b) => a.name.first > b.name.first ? 1 : -1))
}
const sortByLast = () => {
    setUsers((prevUsers) => [...prevUsers].sort((a,b) => a.name.last > b.name.last ? 1 : -1))
}
const sortByAge = () => {
    setUsers((prevUsers) => [...prevUsers].sort((a,b) => a.dob.age - b.dob.age))
}

useEffect(() => { //Denna useEffect kollar om filtrering och users object är lika
    const userFilter = () => { 
    const filtered = originalUsers.filter((user) => 
    (!filter.gender || user.gender === filter.gender) &&
    (!filter.maxAge || user.dob.age <= filter.maxAge) && 
    (!filter.minAge || user.dob.age >= filter.minAge) &&
    (!filter.firstName || user.name.first === filter.firstName) &&
    (!filter.lastName || user.name.last === filter.lastName)
    )
    setFilteredUsers(filtered)
}

userFilter()
},[filter, originalUsers,]) 

useEffect(() => {

    const latestFriends = originalUsers.slice(-5) 
    const latestUserData = latestFriends.map(user => ({ 
    name: {
        title: user.name.title,
        first: user.name.first,
        last: user.name.last
    },
    picture: {large: user.picture.large}
    }))

    const storedUsers = getStoreUsers();

    if (JSON.stringify(latestUserData) !== JSON.stringify(storedUsers)) {
    setLatestUserData(latestUserData)
    myLatestFriends(latestUserData)
    localStorage.setItem("latestUsersData", JSON.stringify(latestUserData));
    }

},[originalUsers, myLatestFriends])

return( //Nedifrån använder vi filtrerings funktionerna och skapar list för friends
<div>
    <h2>Friends</h2>
  <Link to="/" style={{'textDecoration' : 'none'}}>
    <button className="button">Home</button>
  </Link>
<div style={{
    'borderRadius' : '5px',
    'border' : '1px solid black',
    'width' : '750px',
    'height' : '270px',
    'marginLeft' : '150px',
    'marginTop' : '15px',
}}>
<h4>Filter user</h4> 
<label>
Gender:
<select name="gender" value={filter.gender} className="option" onChange={(e) => myGender(e)}>
<option value="">All</option>
<option value="male">Male</option>
<option value="female">Female</option>
</select>
</label>
<br />
<label>
Max age:
<input type="number" max="0" className="ages" onChange={myMaxAge} />
</label>
<br />
<label>
Min age:
<input type="number" min="0" className="ages" onChange={myMinAge} />
</label>
<br />
<br />
<button className="buttonTwo" onClick={sortByFirst}>Sort by Firstname</button>
<button className="buttonTwo" onClick={sortByLast}>Sort by Lastname</button>
<button className="buttonTwo" onClick={sortByAge}>Sort by Age</button>
</div>
        <ul className="container">
        {filteredUsers.map((user, index) => (
            <li key={user.login.username}>
            <div>
            <img src={user.picture.large} alt="" width="150px" height="150px" style={{
                'borderRadius' : '70px'
            }}/>
            </div>
            <br />
            {user.name.title} {user.name.first} {user.name.last} 
            <br />
            <button className="button" onClick={() => dataUsers(index)}>Show Info</button>
            <br />
            {usersData === user && <UserData data={user} /> }
            </li>
        ))}
        </ul>
        <button className="button" onClick={addFriend}>Add friend</button>

    </div>
)
}
export default Friends



