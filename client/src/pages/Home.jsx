import React, { useState, useEffect } from 'react'

import NoteManager from '../components/home/NoteManager'
import Notes from '../components/home/Notes'
import { useNotes } from '../utils/hooks/notes'

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [viewedNote, setViewedNote] = useState(null);

    const { data } = useNotes();

    const handleSetNoteForView = (note) => {
        setViewedNote(note);
    }

    const handleAddNote = (note) => {
        setNotes(prevNotes => [...prevNotes, note])
    }

    const handleDeleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(prevNote => prevNote._id !== id));
    }

    const handleUpdateNote = (note) => {
        setNotes(prevNotes => prevNotes.map(n => n._id === note._id.toString() ? note : n))
    }

    useEffect(() => {
        if (data) {
            setNotes(data);
        }
    }, [data])

    return (
        <div className='flex fixed inset-0 bg-gradient-to-r from-fuchsia-400'>
            <Notes 
                notes={notes} 
                onNoteForView={handleSetNoteForView} 
                />
            <NoteManager
                viewedNote={viewedNote} 
                onNoteForView={handleSetNoteForView}
                onAdd={handleAddNote}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
                />
        </div>
    )
}

export default Home