import { useDispatch, useSelector } from "react-redux"
import UserContext from "../reducers/userReducer"
import { useContext } from "react"
const Users=()=>{
    const [user,userDispatch]=useContext(UserContext)

    return(
        <div>
            Users
            {user.map((user)=>{
                console.log(user.name)
               user.name

            })}
        </div>
    )
}
export default Users