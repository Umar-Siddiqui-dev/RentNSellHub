import React, { createContext, useContext, useEffect, useState } from 'react'
import {io} from "socket.io-client"
import { AuthContext } from './Authcontext';
export const SocketContext=createContext();

export const SocketContextProvider=({children})=>{
    const [socket,Setsocket]=useState( null);
   const {currentUser}=useContext(AuthContext)
    useEffect(()=>{
        Setsocket(io("https://socket-production-a292.up.railway.app"))
    },[])

    useEffect(()=>{
    currentUser && socket?.emit("newUser",currentUser.id)
    },[currentUser,socket])
    return <SocketContext.Provider value={{socket,Setsocket}}>{children}</SocketContext.Provider>
}
