import React from 'react'
import NoteBook from './Notebook'

const Home = (props) => {

    const {userLoggeIn} = props

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e.target.value)
    }

    return (
        <div>
            {userLoggeIn ? 
            (
            <NoteBook/>
            )
            :
            (
                <div className="Login-form">
                    <div style={{paddingBottom:'32px', paddingTop:'64px'}}>
                    <h2 style={{paddingBottom:'16px', textAlign: 'center'}}>Login or Register to Add/Manage Notes</h2>
                    </div>
                    <div style={{textAlign:'center', marginTop:'32px', background:'#F5F5F5', padding:'16px', borderRadius:'12px'}}>
                    <h4>Login Credentials</h4>
                    <p><b>Email</b>: dct6543@gmail.com </p>
                    <button style={{marginBottom:'24px'}} class="btn btn-outline-primary" value="dct6543@gmail.com" onClick={handleCopy}>Copy</button>
                    <p><b>Password</b>: secret123</p>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Home