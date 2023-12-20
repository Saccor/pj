import { useState } from "react"
const UserData = (props) => {

const [hideButton, setHideButton] = useState(true)
const user = props.data

return(
    <div>
    {hideButton && (
    <div>
        {props.data && 
        <div style={{
        'width' : '70%',
        'height' : '50%',
        'marginTop' : '20px',
        'marginLeft' : '33px',
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
    )}
    <br />
    <button onClick={() => setHideButton(!hideButton)} className="button" >
        {hideButton ? "Dölj info" : "Visa igen"}
    </button>
    </div>
)
}
export default UserData