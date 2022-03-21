import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PrivateRoute from '../helpers/PrivateRoute';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";

const NavBar = (props) => {

    const {userLoggeIn, handleAuth} = props

    return (
        <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            {userLoggeIn ? (
                <>
                    <li><Link to="/account">Account</Link></li>
                    <li><Link to="/" onClick={()=>{
                        localStorage.removeItem('token')
                        handleAuth()
                        alert('Successfully Logged Out')
                        props.history.push("/")
                    }}>Logout</Link></li>
                </>
            ): (
                <>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
            )}
        </ul>
        <Route path="/" exact render={(props)=>{
            return <Home {...props} userLoggeIn={userLoggeIn}/>
        }}/>
        <Route path="/register" component={Register} exact/>
        <Route path="/login" render={(props)=>{
            return <Login {...props} handleAuth={handleAuth} />
        }}/>
         <PrivateRoute path="/account" component={Account} /> 
        </div>
    )
}

// const WrapperComponent = withRouter(NavBar)
// export default WrapperComponent

export default withRouter(NavBar)