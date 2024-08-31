import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const login = (userName) => {
        setUser(userName);
    }

    const logout = () => {
        setUser(null);
    }

    return <AuthContext.Provider value={{user, setUser, login, logout}}>
        {children}
    </AuthContext.Provider>
}