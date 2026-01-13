import {create} from 'zustand'
export const useNotification=create((set)=>({
    number:0,
    fetch:async()=>{
        const resp=await fetch('https://rentnsellhub-production.up.railway.app/api/user/notification',{
            method:'get',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await resp.json();
        console.log(data)
        set({number:data})
    },
    decrease:()=>{
            set((prev)=>({number:prev.number-1}))
    },
    reset:()=>set({number:0})
}))