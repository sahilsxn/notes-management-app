import {React} from 'react'
import '../CSS/noteForm.css'


const NoteForm = (props) => {

    const {title, body, handleSubmit, handleChange, formErrors} = props


    return (
        <div className='noteForm'>
            <div style={{borderStyle:'solid', borderRadius:'16px', borderColor:'#E6E6E6', padding:'16px', paddingBottom:'0px'}}>
                <h2 style={{paddingBottom:'16px', textAlign: 'center'}}>Add a New Note</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-1">
                    <input
                        id="floatingInput"
                        class="form-control"
                        name="title" 
                        type="text" 
                        value={title} 
                        onChange={handleChange}
                        placeholder="Add Title"
                        /> 
                        {formErrors.title && <span>{formErrors.title}</span>} <br/>
                        <label for="floatingInput">Note Title</label>
                </div>
                <div className="form-floating mb-1">
                    <input
                        id="floatingInput"
                        class="form-control"
                        name="body" 
                        type="text" 
                        value={body} 
                        onChange={handleChange}
                        placeholder="Write Note"
                        /> <br/>
                        <label for="floatingInput">Note Body</label>
                </div>
                <div className="d-grid gap-2">
                    <input class="btn btn-primary" type="submit" value="Save"/> <br/>
                </div>
                </form>
            </div>
        </div>
    )
}

export default NoteForm