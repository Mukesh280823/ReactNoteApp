import React, { useState } from 'react';
import "../App.css";

function AddNote({ handleAddNote, handleDeleteNote }) {

    const [noteText, setNoteText] = useState("");
    const characterLimit = 200;

    function handleChange(event) {

        // manage when user write 200 charcter after show 0 remaining 
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    }

    function handleSave() {
        if (noteText.length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    }
    return (
        <div className='note-new'>
            <textarea
                rows="8"
                cols="8"
                placeholder='Type a add a note...'
                value={noteText}
                onChange={handleChange}
            />
            <div className='note-footer'>
                <small>{characterLimit - noteText.length} Remaining</small>
                <button className='save' onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default AddNote;