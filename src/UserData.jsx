import React from "react"
const userData = (props) => {

const user = props.data

return(
    <div>
    {props.data && 
    <div style={{
    'width' : '20%',
    'height' : '50%',
    'display' : 'flex',
    'justifyContent' : 'center',
    'flexDirection' : 'column',
    'fontSize' : '12px',
    'backgroundColor' : 'whitesmoke'
    }}>
    <p>Email: {user.email}</p>
    <p>Födelsedatum: {user.dob.date}</p>
    <p>Kön: {user.gender}</p>
    </div>
    }
    </div>
)
}
export default userData