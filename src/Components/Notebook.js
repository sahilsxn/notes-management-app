import {React, useState, useEffect} from "react";
import NoteForm from './NoteForm'
import NotesList from './NotesList'
import axios from "axios";

const NoteBook = (props) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [notesList, setNotesList] = useState([])
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const runValidations = () => {
        if(title.trim().length === 0){
            errors.title = 'Title cannot be blank'
        }
    }

    useEffect(()=>{
        axios.get('https://dct-user-auth.herokuapp.com/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log(response.data)
            const result = response.data
            setNotesList(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const handleChange = (e) => {
        if (e.target.name === "title"){
            setTitle(e.target.value)
        } else if (e.target.name === "body") {
            setBody(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                title: title,
                body:body
            }
            console.log(formData)
            axios.post('https://dct-user-auth.herokuapp.com/api/notes', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((err)=>{
                alert(err)
            });
            setTitle('')
            setBody('');
            axios.get('https://dct-user-auth.herokuapp.com/api/notes', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response)=>{
                console.log(response.data)
                const result = response.data
                setNotesList(result)
            })
            .catch((err)=>{
                console.log(err)
            })
        } else {
            setFormErrors(errors)
        }
    }

    const removeItem = (id) => {
        const result = notesList.filter(note=>{
            return note._id !== id
        })
        setNotesList(result)
    }

    return (
        <div>
            <h1>Signed In - My Notes</h1>
            <NoteForm title={title} body={body} handleChange={handleChange} handleSubmit={handleSubmit} formErrors={formErrors}/>
            <NotesList notesList={notesList} removeItem={removeItem}/>
        </div>
    )
}

export default NoteBook