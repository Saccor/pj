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
    setFilter(prevFilter => ({ ...prevFilter, gender: e.target.value }))
}
const myMaxAge = (e) => {
    setFilter(prevFilter => ({ ...prevFilter, maxAge: +e.target.value }))
}
const myMinAge = (e) => {
    setFilter(prevFilter => ({ ...prevFilter, minAge: +e.target.value }))
}
const sortByFirst = () => {
    setUsers((prevUsers) => [...prevUsers].sort((a,b) => a.name.first > b.name.first ? 1 : -1))
}
const sortByLast = () => {
    setUsers((prevUsers) => [...prevUsers].sort((a,b) => a.name.last > b.name.last ? 1 : -1))
}
const sortByAge = () => {
    setUsers((prevUsers) => [...prevUsers].sort((a,b) => a.dob.age - b.dob.age))
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
    <h2>Friends</h2>
<div style={{
    'borderRadius' : '5px',
    'border' : '1px solid black',
    'width' : '750px',
    'height' : '270px',
    'marginLeft' : '150px'
}}>
<h4>Filter user</h4>
<label>
Kön:
<select name="gender" className="option" onChange={myGender}>
<option value="">Alla</option>
<option value="male">Man</option>
<option value="female">Kvinna</option>
</select>
</label>
<br />
<label>
Max ålder:
<input type="number" max="0" className="ages" onChange={myMaxAge} />
</label>
<br />
<label>
Min ålder:
<input type="number" min="0" className="ages" onChange={myMinAge} />
</label>
<br />
<br />
<button className="buttonTwo" onClick={sortByFirst}>Sort by Firstname</button>
<button className="buttonTwo" onClick={sortByLast}>Sort by Lastname</button>
<button className="buttonTwo" onClick={sortByAge}>Sort by Age</button>
</div>
        <ul className="container">
        {userFilter().map((user, index) => (
            <li key={user.login.username}>
            <div>
            <img src={user.picture.large} alt="" width="150px" height="150px" style={{
                'borderRadius' : '70px'
            }}/>
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