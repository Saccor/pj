import { useEffect, useState } from "react"
import UserData from "./UserData";
import { Link } from "react-router-dom";
const Friends = ({ myLatestFriends}) => {

const [users, setUsers] = useState([]);
const [filteredUser, setFilteredUser] = useState([]) 
const [latestUserData, setLatestUserData] = useState([])
const [usersData, setUsersData] = useState(null)
const [filter, setFilter] = useState({ //filter useState 
    gender: null, 
    maxAge : null, 
    minAge : null,
    firstName : null,
    lastName : null 
})

// Här fetchar vi datan 
const fetchData = async () => {
    let resUser = await fetch('https://randomuser.me/api');
    let jsonUser = await resUser.json();
    console.log(jsonUser.results)
    setUsers((prevUsers) => [...prevUsers, ...jsonUser.results])
} 

//anropar fetchData
useEffect(() => { 
fetchData();
},[])

const addFriend = () => {
    fetchData();
    myLatestFriends([...latestUserData])
    setUsersData(null)
    setFilteredUser([])
}

const addToHome = () => {
    myLatestFriends([...filteredUser])
    setUsersData(null)
    setFilteredUser([])
}

const dataUsers = (index) => {

    const selectedUser = filteredUser[index]
    setUsersData(selectedUser)

}

//Olika funktioner för filtrering
const myGender = (e) => {
    setFilter(prevFilter => ({ ...prevFilter, gender: e.target.value }))
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

useEffect(() => {
    const userFilter = () => {
    const filtered = users.filter((user) => 
    (user.gender === filter.gender || !filter.gender) &&
    (user.dob.age <= filter.maxAge || !filter.maxAge) && 
    (user.dob.age >= filter.minAge || !filter.minAge) &&
    (user.name.first === filter.firstName || !filter.firstName) &&
    (user.name.last === filter.lastName || !filter.lastName)
    )
    setFilteredUser(filtered)

    const latestFriends = users.slice(-5)
    const latestUserData = latestFriends.map(user => ({ 
        name: {
            title: user.name.title,
            first: user.name.first,
            last: user.name.last
        },
        picture: {large: user.picture.large}
    }))
    setLatestUserData(latestUserData)
    }

userFilter()
},[filter,users]) 

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
<select name="gender" className="option" onChange={myGender}>
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
        {filteredUser.map((user, index) => (
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
        <button className="button" onClick={addToHome}>Add to home</button>
    </div>
)
}
export default Friends