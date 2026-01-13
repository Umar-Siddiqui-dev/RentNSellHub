import React, { useContext, useEffect, useRef, useState } from 'react'
import './chat.scss'
import { AuthContext } from '../../context/Authcontext'
import {format} from 'timeago.js'
import { SocketContext } from '../../context/SocketContext'
import { useNotification } from '../../../Notification'


const Chat = ({chats}) => {
    const [chat,Setchat]=useState(null)
    const messageEndRef=useRef()
    const decrease=useNotification(state=>state.decrease)
    const {currentUser}=useContext(AuthContext)
    const {socket}=useContext(SocketContext)
    console.log(chats)
    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"})
    },[chat])
    const handlechats=async(id,reciever)=>{
        try{
            const res=await fetch("https://rentnsellhub-production.up.railway.app/api/chat/"+id,{
                method:"get",
                credentials:"include"
            })
            const data=await res.json();
            console.log(data)
            console.log(data.chat)
            console.log(reciever)
               if(!data.chat.seenby.includes(currentUser.id)){
                decrease();
               }
            Setchat({...data.chat,reciever})

        }catch(e){
            console.log(e)
        }
    }
   
    console.log(chat)
   
    
const handlesubmit=async(e)=>{
    e.preventDefault();
    const formdata= new FormData(e.target)
    const text=formdata.get("text")
    console.log(text)
    const response= await fetch("https://rentnsellhub-production.up.railway.app/api/message/"+chat.id,{
        method:"post",
        headers: {
            'Content-Type': "application/json"
          },
        credentials:"include",
            body:JSON.stringify({text})
    })
    const data=await response.json();
    console.log(data)
    console.log(chat)
    Setchat((prev)=>({...prev,message:[...prev.message,data]}))
    e.target.reset()
   console.log(chat.reciever.id)
    socket.emit("sendMessage", {
        receiverId: chat.reciever.id, 
        data: data
    });
}
useEffect(()=>{
    const read=async()=>{
        try{
            await fetch('https://rentnsellhub-production.up.railway.app/api/chat/read/'+chat.id,{
                method:"put",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
        catch(e){
            console.log(e)
        }
    }
    if(chat && socket){
        socket.on("getMessage",(data)=>{
            console.log(data)
        if(chat.id===data.chatId){
            Setchat((prev)=>({...prev,message:[...prev.message,data]}))
            read()
        }
        })
    }
    return () => {
        socket.off("getMessage");
      };
},[socket,chat])
  return (
    
    <div className='chat'>
      <div className="messages">
        <h1>Messages</h1>
       {chats &&
        chats.map((c)=>(
            <div className="message" key={c.id} style={{ 
                backgroundColor: c.seenby.includes(currentUser.id) || chat?.id===c.id ? 'white' : "gray" 
            }} onClick={()=>handlechats(c.id,c.reciever)}>
            
            <img src={c.reciever.image || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
            <span>{c.reciever.username}</span>
            <p>{c.lastmessage}</p>
        </div>
        ))
       }
       
      </div>
 {    chat&& ( <div className="chating">
            <div className="top">
                <div className="user">
                    <img src={chat.reciever.image ||"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
                   { chat.reciever.username}
                </div>
                <span className='close' onClick={()=>Setchat(false)}>x</span>
            </div>
            <div className="center">
                {
                   chat && 
                    chat.message.map((msg)=>(
                        
                        <div className="chatmsg" key={msg.id} style={{
                                alignSelf: msg.userId === currentUser.id ? "flex-end" : "flex-start",
                                alignItems: msg.userId === currentUser.id ? "right" : "left"
                        }}>
                        <p>{msg.text}</p>
                        <span>{format(msg.createdAt)}</span>
    
                    </div>   
    
                    ))
                }
                <div ref={messageEndRef}></div>
               
                
           
            </div>
            <form className="bottom" onSubmit={handlesubmit}>
                <textarea name='text' placeholder='Enter Message Here ...'></textarea>
                <button>Send</button>
            </form>
      </div>)}

    </div>
  )
}

export default Chat
