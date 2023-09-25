import React from 'react'
import "../App.css";
import { MdDeleteForever } from "react-icons/md";
function Note({ id, text, date, handleDeletNote }) {
    return (
        <div className='note'>
            <span>
                {text}
            </span>
            <small>{id}</small>
            <div className='note-footer'>
                <small>{date}</small>
                <MdDeleteForever
                    onClick={() => handleDeletNote(id)}
                    className='delete-icon'
                    size='1.3rem'
                />
            </div>
        </div>
    )
}

export default Note