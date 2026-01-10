import React, { useContext, useEffect, useState } from 'react'
import '../singlepage/SinglePage.scss'
import Slider from '../../components/slider/Slider'
import {singlePostData,userData} from '../../dumydata'
import pin from '../../assets/pin.png'
import utility from '../../assets/utility.png'
import pet from '../../assets/pet.png'
import bed from '../../assets/bed.png'
import fee from '../../assets/fee.png'
import bath from '../../assets/bath.png'
import size from '../../assets/size.png'
import school from '../../assets/school.png'
import bus from '../../assets/bus.png'
import msg from '../../assets/chat.png'
import resturant from '../../assets/restaurant.png'
import save from '../../assets/save.png'
import Map from '../../components/map/map'
import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import DOMpurify from 'dompurify'

import {AuthContext} from '../../context/Authcontext'
const Singlepage = () => {
  const post=useLoaderData();
  const nav=useNavigate()
  const {currentUser}=useContext(AuthContext)
  const [saved,Setsaved]=useState(post.isSaved)
  // console.log(saved)
  console.log(post)
  const dummyimages=["https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]

  const handlesave=async()=>{

    Setsaved((prev)=>!prev)
    if(!currentUser){
       redirect("/login")
      }
    
    try{

    const response=await fetch("http://localhost:8800/api/user/save/",{
      method:'post',
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        postId:post.id,
      })
      
    })
    const d=await response.json();
  
    console.log(d)
    }
    catch(e)
    {
      console.log(e)
      Setsaved((prev)=>!prev)
    }
  }
  const handlesendmessage=async(e)=>{
  if (currentUser!==post.userId)
  {
    const response=await fetch("http://localhost:8800/api/chat/",{
    method:"post",
    credentials:"include",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({
      recieverId:post.userId
    })
  })
  nav('/profile')
  }
  else{
    alert("you can't send message to yourself")
  }
  
  
  }
  return (
    <div className="singlepage">
        
    <div className='details'>
      <div className="wrapper">
        <Slider images={post.images?post.images :dummyimages}/>
        <div className="info">
          <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src={pin} alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">
                  <span>${post.price}</span>
                </div>
              </div>
              <div className="user">
                <img src={post.author.image} alt="" />
                <span>{post.author.username}</span>
              </div>
          </div>
          <div className="bottom" dangerouslySetInnerHTML={{__html:DOMpurify.sanitize(post.postDetail.desc)}}>
            
          </div>
        </div>
        {/* <Chat chats={null} isProfile={f}/> */}
      </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src={utility} alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.postDetail.utils ==='owner' ?
                  <p>Owner is responsible</p>:
                  <p>Tenant is responsible</p>

                }
              </div>
            </div>
            <div className="feature">
              <img src={pet} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.postDetail.pet ==='allowed' ?
                  <p>Pets Allowed</p>:
                  <p>Pets Not Allowed</p>
        
                }
                
              </div>
            </div>
            <div className="feature">
              <img src={fee} alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src={size} alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src={bed} alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src={bath} alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src={school} alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school} km away</p>
              </div>
            </div>
            <div className="feature">
              <img src={bus} alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus} km away</p>
              </div>
            </div>
            <div className="feature">
              <img src={resturant} alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.bus} km away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handlesendmessage} >
              <img src={msg} alt="" />
              Send a Message
            </button>
            <button onClick={handlesave} style={{
              backgroundColor:saved ? '#fece51':"white",
            }}>
              <img src={save} alt="" />
              {saved?"place saved":" Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singlepage
 {/* <div className="features">
        <div className="wrapper">
        <div className="general">
          <h2>General</h2>
          <div className="vertical">

            <div className='boxes'>
              <img src={utility} alt="" />
              <div className='text'>
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className='boxes'>
              <img src={pet} alt="" />
              <div>
                <span>Pet policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className='boxes'>
              <img src={fee} alt="" />
              <div>
                <span>Property Fee</span>
                <p>Must have 3x the rent in local household income</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sizes">
          <h2>Room Sizes</h2>
          <div className="horizontal">
            <div className="size-box">
              <img src={size} alt="" />
              <div className="text">
                <p>80sqm (861sqft)</p>
              </div>
            </div>
            <div className="size-box">
              <img src={bed} alt="" />
              <div className="text">
                <p>2 bed</p>
              </div>
            </div>
            <div className="size-box">
              <img src={bath} alt="" />
              <div className="text">
                <p>1 bathroom</p>
              </div>
            </div>
          </div>
          </div>
        <div className="nearby">
          <h2>Nearby Places</h2>
          <div className="horizontal">
            <div className="size-box">
              <img src={school} alt="" />
              <div className="text">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="size-box">
              <img src={bus} alt="" />
              <div className="text">
                <span>Bus stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="size-box">
              <img src={resturant} alt="" />
              <div className="text">
                <span>Resturant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
        </div>
        <div className="location">
          <p>Location</p>
        </div>
        <div className="btns">
          <div className="msg">
            <img src={msg} alt="" />
            <p>Send a message</p>
          </div>
          <div className="save">
            <img src={save} alt="" />
            <p>Save the place</p>
          </div>
        </div>
        
      </div>
      </div> */}