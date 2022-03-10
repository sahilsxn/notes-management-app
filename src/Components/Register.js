import {React, useState} from "react";
import axios from 'axios'
import validator from 'validator';

const Register = (props) => {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const runValidations = () => {
        if(username.trim().length === 0){
            errors.username = 'Name cannot be blank'
        }
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
                username: username,
                email: email,
                password: password
            }
            
            // console.log(formData)

            axios.post('https://dct-user-auth.herokuapp.com/users/register', formData)
            .then((response)=>{
                const result = response.data
                if (result.hasOwnProperty('errors')){
                    alert(result.message)
                } else {
                    alert('Account successfully created')
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    props.history.push('/login')
                }
            })
            .catch((err)=>{
                window.alert(err.message)
            })

        } else {
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {

        if (e.target.name === "username"){
            setUsername(e.target.value)
        } else if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    return (
        <div>
            <h2>Register with Us</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={handleChange} 
                    placeholder="Enter Username"
                    /> {formErrors.username && <span>{formErrors.username}</span>} <br/>
                
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
        </div>
    )
}

export default Register