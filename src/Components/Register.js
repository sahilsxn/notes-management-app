import {React, useState} from "react";
import axios from '../config/axios'
import validator from 'validator';
import '../CSS/register.css'

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

            axios.post('/users/register', formData)
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
        <div className="Register-form">
            <div style={{borderStyle:'solid', borderRadius:'16px', borderColor:'#E6E6E6', padding:'16px', paddingBottom:'32px'}}>
                <h2 style={{paddingBottom:'16px', textAlign: 'center'}}>Register with Us</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-floating mb-1">
                    <input
                        id="floatingInput"
                        class="form-control"
                        type="text" 
                        name="username" 
                        value={username} 
                        onChange={handleChange} 
                        placeholder="Enter Username"
                        /> 
                        <label for="floatingInput">Enter Username</label>
                        {formErrors.username && <span>{formErrors.username}</span>} <br/>
                    </div>
                    <div class="form-floating mb-1">
                    <input
                        id="floatingInput"
                        class="form-control"
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={handleChange} 
                        placeholder="Enter Email"
                        /> 
                        <label for="floatingInput">Email Address</label>
                        {formErrors.email && <span>{formErrors.email}</span>} <br/>
                    </div>
                    <div class="form-floating mb-1">
                    <input 
                        id="floatingPassword"
                        class="form-control"
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        placeholder="Enter Password"
                        /> 
                        <label for="floatingPassword">Password</label>
                        {formErrors.password && <span>{formErrors.password}</span>} <br/>
                    </div>
                    <div class="d-grid gap-2">
                    <input class="btn btn-primary" type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register