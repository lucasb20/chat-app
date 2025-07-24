"use client"

import { createContext, useState } from "react"
import { AuthContextType } from "./Interfaces"

export const TokenContext = createContext <AuthContextType | undefined>(undefined)

export const TokenContextProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [token, setToken] = useState<string>("")

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}