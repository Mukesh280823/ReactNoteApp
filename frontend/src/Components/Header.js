import React from 'react'
import "../App.css";

function Header({handleDarkMode}) {
    return (
        <div>
            <div className='top-logo-section'>
                <h2>Notes</h2>
                <button onClick={()=>handleDarkMode((prev)=>!prev)} className='toggle-btn'>Toggle Mode</button>
            </div>
        </div>
    )
}

export default Header