import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import '../../css/layout/Header.css'
import {AuthContext, ContextType} from '../Authentication/AuthContext'
import firebase from '../Authentication/firebase'

const Header= () => {
  const { currentUser }  = useContext<ContextType>(AuthContext)

  function logOut(){
    firebase.auth().signOut().then(()=>{
      
    })
  }

  return(
    <div className='header' >
      <div className='navOne'>
        <h1>My spot</h1>
        {
          currentUser  ? (
            <div className='login-container' onClick={logOut} >
                <img src={currentUser.photoURL as string} alt='Profile' />
            </div>
            
          ) : (
            <Link to="/login" className='login-btn' >LOG IN</Link>
          )
        }
      </div>
      <div className='navTwo'>
        <Link className='nav-link' to='/' >Map</Link>
        <Link className='nav-link' to='/favoritespots'>Favorite Spots</Link>
        <Link className='nav-link' to='/about'>About us</Link>
      </div>
    </div>
  )
}

export default Header
