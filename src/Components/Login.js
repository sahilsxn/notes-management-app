import {React, useState} from "react";
import validator from 'validator';
import axios from '../config/axios'
import '../CSS/login.css'

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
         <div className="Login-form">
            <div style={{borderStyle:'solid', borderRadius:'16px', borderColor:'#E6E6E6', padding:'16px', paddingBottom:'32px'}}>
                <h2 style={{paddingBottom:'16px', textAlign: 'center'}}>Login</h2>
                <form onSubmit={handleSubmit}>
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
                        <label for="floatingInput">Email address</label>
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
                <div style={{textAlign:'center', marginTop:'32px', background:'#F5F5F5', padding:'16px', borderRadius:'12px'}}>
                <h4>Credentials</h4>
                <p><b>Email</b>: dct6543@gmail.com </p>
                <button style={{marginBottom:'24px'}} class="btn btn-outline-primary" value="dct6543@gmail.com" onClick={handleCopy}>Copy</button>
                <p><b>Password</b>: secret123</p>
                </div>
        </div>
    )
}

export default Login