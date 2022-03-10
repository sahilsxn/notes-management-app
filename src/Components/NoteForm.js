import {React} from 'react'

const NoteForm = (props) => {

    const {title, body, handleSubmit, handleChange, formErrors} = props


    return (
        <div>
            <h2>Add a Note</h2>
            <form onSubmit={handleSubmit}>
            <input 
                name="title" 
                type="text" 
                value={title} 
                onChange={handleChange}
                placeholder="Add Title"
                /> {formErrors.title && <span>{formErrors.title}</span>} <br/>
            <input 
                name="body" 
                type="text" 
                value={body} 
                onChange={handleChange}
                placeholder="Write Note"
                /> <br/>
            <input type="submit"/> <br/>
            </form>
        </div>
    )
}

export default NoteForm