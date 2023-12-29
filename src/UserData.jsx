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
        'width' : '100%',
        'height' : '50%',
        'display' : 'flex',
        'justifyContent' : 'center',
        'flexDirection' : 'column',
        'fontSize' : '12px',
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
        {hideButton ? "Hide info" : "Show again"}
    </button>
    </div>
)
}
export default UserData