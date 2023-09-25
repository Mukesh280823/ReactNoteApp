import React, { useState } from 'react';
import Note from './Note';
import AddNote from './AddNote';




function NoteList({ notes, handleAddNote,  handleDeletNote}) {
  return (
    <>
      <div className="note-list">
        {
          notes.map((note) => (
            <Note
              id={note.id}
              text={note.text}
              date={note.date}
              handleDeletNote={ handleDeletNote}

            />
          ))}
        <AddNote handleAddNote={handleAddNote} />
      </div>
    </>
  );
}

export default NoteList;