import React, { useEffect, useState } from 'react'
import NavBar from './Components/NavBar';

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
    <div>
      <h1>User Auth</h1>
      <NavBar userLoggeIn={userLoggeIn} handleAuth={handleAuth}/>
    </div>
  )
}

export default App;
