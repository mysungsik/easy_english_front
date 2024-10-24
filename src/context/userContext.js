import { createContext, useState } from "react";
import {jwtDecode} from "jwt-decode"

const UserContext = createContext()
const jwt = localStorage.getItem("jwt")

export const UserContextProvider = ({children})=>{
    const [user, setUser] = useState( jwt != null ? {...jwtDecode(jwt)} : {})

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;