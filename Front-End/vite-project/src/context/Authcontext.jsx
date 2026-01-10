import { createContext ,useEffect,useState} from "react";

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const getStoredUser = () => {
        const user = localStorage.getItem("user");
        if (!user || user === "undefined" || user === "null") {
            return null;
        }
        try {
            return JSON.parse(user);
        } catch (e) {
            return null;
        }
    };
    
    const [currentUser,SetcurrentUser]=useState(getStoredUser());
    const updateUser=(data)=>{
        SetcurrentUser(data);
    }
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
    },[currentUser])
    return <AuthContext.Provider value={{currentUser,updateUser}}>{children}</AuthContext.Provider>
}