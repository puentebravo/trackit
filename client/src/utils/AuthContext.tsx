
import React, {createContext, useContext, useState } from "react";
import {AuthContextType, authObject} from "../@types/client"

interface Props {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext) 

export const AuthProvider: React.FC<Props> = ({ children }) => { 
   
    const [loggedIn, setLoggedIn] = useState<authObject>({
        loggedIn: false,
        userId: ""
    })

    const saveAuth = (id: string) => {
        setLoggedIn({
            loggedIn: true,
            userId: id
        })
    }

    const handleLogout = () => {
        setLoggedIn({
            loggedIn: false,
            userId: ""
        })
    }

    return (
        <AuthContext.Provider value={{loggedIn, saveAuth, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )


}
