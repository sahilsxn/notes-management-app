import {React, useState} from "react";
import validator from 'validator';
import axios from '../config/axios'

const Login = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const runValidations = () => {
        if(email.trim().length === 0){
            errors.email = 'Email cannot be blank'
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid email format"
        }
        if(password.trim().length === 0){
            errors.password = 'Password cannot be blank'
        }
    }

    const handleSubmit = (e) => {
         
        e.preventDefault()
        
        runValidations()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                email: email,
                password: password
            }
            axios.post("/users/login", formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')) {
                    alert(result.errors)
                } else {
                    alert("Successfully Logged In")
                    localStorage.setItem('token', result.token)
                    props.history.push("/")
                    props.handleAuth()
                }
            })
            .catch((err)=>{
                console.log(err.message)
            })
        } else {
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {

        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e.target.value)
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    placeholder="Enter Email"
                    /> {formErrors.email && <span>{formErrors.email}</span>} <br/>
                
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleChange} 
                    placeholder="Enter Password"
                    /> {formErrors.password && <span>{formErrors.password}</span>} <br/>
                <input type="submit"/>
            </form>
            <h3>Credentials</h3>
            <p>Email - dct6543@gmail.com <button value="dct6543@gmail.com" onClick={handleCopy}>Copy</button></p>
            
            <p>secret123</p>
        </div>
    )
}

export default Login