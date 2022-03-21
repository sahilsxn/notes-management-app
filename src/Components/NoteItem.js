import {React} from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'

const NotesItem = (props) => {

    const {noteTitle, noteBody, noteId, removeItem} = props

    const handleDelete = () => {
        const confirmRemove = window.confirm('Are you sure?')
        if(confirmRemove){
            axios.delete(`/api/notes/${noteId}`,{
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                removeItem(result._id)
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
    }


    const handleTitleClick = () => {
        axios.get(`https://dct-user-auth.herokuapp.com/api/notes/${noteId}`,{
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            // window.alert(`${result.title} -
            // ${result.body}`)
            Swal.fire({
                title: result.title,
                text: result.body,
                confirmButtonText: 'Cool'
              })
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    return (
        <div>
            <h2 onClick={handleTitleClick}>{noteTitle}</h2>
            <p>{noteBody}</p>
            <button onClick={handleDelete}>Delete</button>
            <hr/>
        </div>
    )
}

export default NotesItem