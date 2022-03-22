import {React, useState, useEffect} from "react";
import NoteForm from './NoteForm'
import NotesList from './NotesList'
import axios from '../config/axios';
import '../CSS/noteBook.css'


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
        axios.get('/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            const newArr = [...result]
            const data = newArr.reverse()
            setNotesList(data)
            console.log(newArr)
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
            axios.post('/api/notes', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response)=>{
                console.log(response.data)
                const result = response.data
                setNotesList([result, ...notesList])
            })
            .catch((err)=>{
                alert(err)
            });
            setTitle('')
            setBody('');
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
        <div className="NoteBook">
            <NoteForm title={title} body={body} handleChange={handleChange} handleSubmit={handleSubmit} formErrors={formErrors}/>
            <h1>Saved Notes</h1>
            <NotesList notesList={notesList} removeItem={removeItem}/>
        </div>
    )
}

export default NoteBook