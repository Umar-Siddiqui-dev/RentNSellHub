import React, { useContext, useEffect } from 'react'
import './Profile.scss'
import Addtolist from '../../components/addtolist/Addtolist'
import Chat from '../../components/chat/Chat'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/Authcontext'
import { Link } from 'react-router-dom' 
const Profile = ({authorid}) => {
  const data=useLoaderData()
  console.log(data.posts)
  console.log(data.chats)
  const{currentUser,updateUser}=useContext(AuthContext);
  const navigate=useNavigate()
  console.log(authorid)
  const handlelogout=async()=>{
    const res= await fetch("https://rentnsellhub-production.up.railway.app/api/auth/login");
    updateUser(null)
    navigate("/")
  }
  return (

    <div className='profile'>
      <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Profile</h1>
              <Link to="/profile/update" ><button>Update Profile</button></Link>
            </div>
            
            <div className="info">
              <span>
                Avatar: 
                <img src={currentUser.image || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="" />
              </span>
              <span>
                Name: <b>{ currentUser.username}</b>
              </span>
              <span>Email: <b>{ currentUser.email }</b></span>
              <button onClick={handlelogout}>Logout</button>
            </div>
           <div className="posts_show">
            <div className="myposts">
            <div className="title">
              <h1>My Posts</h1>
              <Link to="/addpost"><button>Create new post</button></Link>
            </div>
            <Addtolist post={data.posts.myposts}/>
            </div>
            <div className="saved_posts">
            <div className="title">
              <h1>Saved Posts</h1>
            </div>
            <Addtolist post={data.posts.savedPost}/>
            </div>
           </div>
          </div>
      </div>
      <div className="chat">
        <div className="wrapper">
          <Chat chats={data.chats}/>
        </div>
      </div>
    </div>
  )
}

export default Profile
