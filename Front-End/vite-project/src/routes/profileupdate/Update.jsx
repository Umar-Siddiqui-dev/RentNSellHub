import React, { useContext, useState } from 'react'
import './update.scss'
import { AuthContext } from '../../context/Authcontext';
import Upload_images from '../../components/upload/Uplaodimages';
// import axios from 'axios'
const Update = () => {
    const{currentUser,updateUser}=useContext(AuthContext);  
    const [image,setImage]=useState([]);
  const [error,Seterror]=useState(null)
    const handlesubmit=async(e)=>{
      e.preventDefault();
      const formdata=new FormData(e.target);
      const {username,email,password}=Object.fromEntries(formdata)
      try{
        // const res= await axios.put(`https://rentnsellhub-production.up.railway.app/api/user/${currentUser.id}`,{username,email,password})
        const res = await fetch(`https://rentnsellhub-production.up.railway.app/api/user/${currentUser.id}`, {
          method: 'PUT',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({ username, email, password ,image:image[0]})
        });
const data=await res.json();
updateUser(data);
// console.log(data)
  if (!data.success) Seterror(data.message)
      }catch(e){
        console.log(e)
        Seterror(e.response.data.message)
      }
    }
    return (

    <div className="profileUpdatePage">
    <div className="formContainer">
      <form onSubmit={handlesubmit}>
        <h1>Update Profile</h1>
        <div className="item">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={currentUser.username}
          />
        </div>
        <div className="item">
          <label htmlFor="email">Email</label>
          <input
          defaultValue={currentUser.email}
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div className="item">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        {error && <div className="error">{error}</div>}
        <button>Update</button>
      </form>
    </div>
    <div className="sideContainer">
      <img src={image[0] || currentUser.image ||"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" className="avatar" />
      <Upload_images uwConfig={{
        cloudName:"dl0u7efwt",
        uploadPreset:"estate",
        multiple:false,
        maxImageFileSize:2000000,
        folder:"images"
      }}
      setState={setImage}
      
      />
    </div>
  </div>
  )
}

export default Update
