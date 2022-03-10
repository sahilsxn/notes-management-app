import {React} from 'react'
import NoteItem from "./NoteItem"

const NotesList = (props) => {

    const {notesList, removeItem} = props

    return (
        <div>
        {notesList.length===0 && <p>No Notes Added. Add a new note</p>}
        {notesList.length>0 && notesList.map(ele=>{
            return <NoteItem
                        key={ele._id} 
                        noteTitle={ele.title} 
                        noteBody={ele.body}
                        noteId={ele._id}
                        removeItem={removeItem}
                    />
        })}
        </div>
    )
}

export default NotesList