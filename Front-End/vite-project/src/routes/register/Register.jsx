import {Link, useNavigate} from 'react-router-dom'
import './register.scss'
import React, { useState } from 'react'
// import base_url from '../../../lib/consts.js'
import bg from '../../assets/bg.png'
const Register = () => {
  const nav=useNavigate();
  const [isloading,Setisloading]=useState(false);
  const[error,Seterror]=useState("")
  const handlesubmit=async(e)=>{
    e.preventDefault();
    Setisloading(true);
    const formdata=new FormData(e.target)
    const username=formdata.get('username');
    const email=formdata.get("email");
    const password=formdata.get("password");
    try{
      const response= await fetch("https://rentnsellhub-production.up.railway.app/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          username,email,password
        })
      });
      const data=await response.json();
      if(data.success){
        nav("/login")
        
      }
      else{
        Seterror(data.message);
      }
    }catch(e){
      console.log(e)
      Seterror(e);
    }finally{
      Setisloading(false)
    }
  }
  return (
    <div className='register'>
        <div className="formContainer">
            <form onSubmit={handlesubmit}>
                <h1>Create Account</h1>
                <input type="text" name="username" placeholder='Username' />
                <input type="text" name="email" placeholder='Email' />
                <input type="password" name="password" required minLength={3} placeholder='Password' />
                {!isloading &&<button>Register</button>}
                {error &&<span>{error}</span>}
                <Link to="/login">Have an account? <span>Login</span></Link>
            </form>
        </div>
        <div className="imgContainer">
            <img src={bg} alt="" />
        </div>
      
    </div>
  )
}

export default Register
