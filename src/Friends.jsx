import { useEffect, useState } from "react"
import UserData from "./UserData";
import { Link } from "react-router-dom";
import './App.css';
const Friends = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]) 
    const [usersData, setUsersData] = useState(null) 
    const [filter, setFilter] = useState({ 
        gender: '', 
        maxAge : null, 
        minAge : null,
        firstName : null,
        lastName : null 
    })

const getLocal = localStorage.getItem("TEST");
const storedUser = getLocal ? JSON.parse(getLocal) : [];

const addFriend = async () => {
    let resUser = await fetch('https://randomuser.me/api');
    let jsonUser = await resUser.json();
    //Två olika listor av samma data, en för filtrering och en för display för hemsidan
    setUsers((prevUsers) => [...prevUsers,...jsonUser.results]) 
    setFilteredUsers((prevUsers) => [...prevUsers,...jsonUser.results])
    localStorage.setItem("TEST", JSON.stringify(users));
}

const dataUsers = (index) => { 
    const selectedUser = filteredUsers[index]
    setUsersData(selectedUser)
}

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
    setFilteredUsers((prevUsers) => [...prevUsers].sort((a,b) => a.name.first > b.name.first ? 1 : -1))
}
const sortByLast = () => {
    setFilteredUsers((prevUsers) => [...prevUsers].sort((a,b) => a.name.last > b.name.last ? 1 : -1))
}
const sortByAge = () => {
    setFilteredUsers((prevUsers) => [...prevUsers].sort((a,b) => a.dob.age - b.dob.age))
}

useEffect(() => { //Denna useEffect kollar om filtrering och users object är lika
    const userFilter = () => { 
    const filtered = storedUser.filter((user) => 
    (!filter.gender || user.gender === filter.gender) &&
    (!filter.maxAge || user.dob.age <= filter.maxAge) && 
    (!filter.minAge || user.dob.age >= filter.minAge) &&
    (!filter.firstName || user.name.first === filter.firstName) &&
    (!filter.lastName || user.name.last === filter.lastName)
    )
    setFilteredUsers(filtered)
}

userFilter()

},[filter, users]) 

return( //Nedifrån använder vi filtrerings funktionerna och skapar list för friends
<div>
    <h2>Friends</h2>
  <Link to="/" style={{'textDecoration' : 'none'}}>
    <button className="button">Home</button>
  </Link>
<div>
<h4>Filter user</h4> 
<label>
Gender:
<select style={{
    'height' : '40px'
}} name="gender" value={filter.gender} className="option" onChange={(e) => myGender(e)}>
<option value="">All</option>
<option value="male">Male</option>
<option value="female">Female</option>
</select>
</label>
<br />
<label>
Max age:
<input style={{
    'width' : '170px'
}} type="number" max="0" className="ages" onChange={myMaxAge} />
</label>
<br />
<label>
Min age:
<input style={{
    'width' : '170px',
}} type="number" min="0" className="ages" onChange={myMinAge} />
</label>
<br />
<br />
<button className="buttonTwo" onClick={sortByFirst}>Sort by Firstname</button>
<button className="buttonTwo" onClick={sortByLast}>Sort by Lastname</button>
<button className="buttonTwo" onClick={sortByAge}>Sort by Age</button>
</div>
<button style={{ 'marginTop' : '15px'}} className="button" onClick={addFriend}>Add friend</button>
<div className="list-container">
        <ul className="list">
        {filteredUsers.map((user, index) => (
            <li className="listItem" key={user.login.username}>
            <div>
            <img src={user.picture.large} alt="" width="150px" height="150px" style={{
                'borderRadius' : '70px'
            }}/>
            </div>
            <br />
            <p className="name">
            {user.name.title} {user.name.first} {user.name.last} 
            </p>
            <button className="button" onClick={() => dataUsers(index)}>Show Info</button>
            <br />
            {usersData === user && <UserData data={user} /> }
            </li>
        ))}
        </ul>
</div>
    </div>
)
}
export default Friends



