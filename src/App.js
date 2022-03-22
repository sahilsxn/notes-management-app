import React, { useEffect, useState } from 'react'
import NavBar from './Components/NavBar';
import './App.css'

const App = () => {

  const [userLoggeIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
      setUserLoggedIn(!userLoggeIn)

  }

  useEffect(()=>{
    if (localStorage.getItem('token')){
      handleAuth()
    }
  },[])
  
  return (
    <div className='App'>
      <h1 style={{width:'max-content'}}>Quick Notes</h1>
      <NavBar userLoggeIn={userLoggeIn} handleAuth={handleAuth}/>
    </div>
  )
}

export default App;
