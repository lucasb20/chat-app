import { createContext, useState } from "react";


export const TokenContext = createContext({
    username:null,
    token:null,
    setToken:()=>{},
    setUsername:()=>{}
})

const TokenContextProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState(null)

    return(
        <TokenContext.Provider value={{ username, token, setToken, setUsername }} >
            {children}
        </TokenContext.Provider>
    )
}

export default TokenContextProvider