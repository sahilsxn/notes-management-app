import React from 'react'
import NoteBook from './Notebook'

const Home = (props) => {

    const {userLoggeIn} = props

    return (
        <div>
            {userLoggeIn ? 
            (
            <NoteBook/>
            )
            :
            (<h2>Sign or Create Account to Add/Manage notes</h2>)
            }
        </div>
    )
}

export default Home