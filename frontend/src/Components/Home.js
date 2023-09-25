import React, { useEffect } from 'react'
import { useState } from 'react';
import "../App.css";
import { BiSearchAlt2 } from "react-icons/bi";
import NoteList from './NoteList';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package
import Search from './Search';
import Header from './Header';



// npm i react-icons

function Home() {
    const [notes, setNotes] = useState([
        {
            id: uuidv4(),
            text: "This is my first notes",
            date: "24/9/2023"
        }, {
            id: uuidv4(),
            text: "This is my second notes",
            date: "24/9/2023"
        }
        , {
            id: uuidv4(),
            text: "This is my third notes",
            date: "24/9/2023"
        }
    ]);


    const [searchText, setSearchText] = useState();
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedNotes = JSON.parse(
            localStorage.getItem('react-notes-app-data')
        )
        if (savedNotes) {
            setNotes(savedNotes)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(
            'react-notes-app-data',
            JSON.stringify(notes)
        );
    }, [notes]);






    function addNote(text) {
        const date = new Date();
        const newNote = {
            id: uuidv4(),
            text: text,
            date: date.toLocaleDateString()
        }
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }
    // Filter the notes based on the search text
    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchText)
    );

    return (
        <div className={`${darkMode && 'dark-mode'}`}>
            <div className='dashboard-container'>
                <Header handleDarkMode={setDarkMode} />
                <Search handleSearchNote={setSearchText} />
                <NoteList
                    notes={filteredNotes}
                    handleAddNote={addNote}
                    handleDeletNote={deleteNote}
                />

            </div>
        </div>
    )
}

export default Home;