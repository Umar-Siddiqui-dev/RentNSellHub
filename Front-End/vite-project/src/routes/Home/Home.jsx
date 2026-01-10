import React, { useContext } from 'react'
import './Home.scss'
import bg from '../../assets/bg.png'
import Hero from '../Hero/Hero'
import { AuthContext } from '../../context/Authcontext.jsx'
const Home = () => {
    const{currentUser}=useContext(AuthContext)
    console.log(currentUser);
  return (
    <div className='home'>
        <div className="text">
            <div className="headers">
            <h1>FIND REAL ESTATE & GET YOUR DREAM PLACE</h1>
            
            <p className='pclass'>
            Discover unparalleled living. Whether you're searching for a cozy apartment, a spacious family house, or a luxurious estate, we have the perfect property to meet your needs.
            </p>
            
                <Hero/>

                <div className="stats">
                    <div className="years">
                        <h1>16+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="awards">
                        <h1>200</h1>
                        <h2>Awards Granted</h2>

                    </div>
                    <div className="property">
                        <h1>1200+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="image">
            <img src={bg} alt="" />
        </div>
    </div>
  )
}

export default Home
