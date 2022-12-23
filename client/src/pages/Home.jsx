import React, { useState, useEffect } from 'react'

import Navbar from '../components/Navbar'
import Notes from '../components/home/notes/Notes'
import Form from '../components/home/ConnectedForm'
import { useNotes } from '../utils/hooks/notes'

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [editedNote, setEditedNote] = useState(null);

    const { data } = useNotes();

    const handleSetNoteForEdit = (note) => {
        setEditedNote(note);
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Navbar />
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)'
            }}>
                <Notes 
                    notes={notes} 
                    onSetNoteForEdit={handleSetNoteForEdit} 
                    onDelete={handleDeleteNote}
                    />
                <Form 
                    editedNote={editedNote} 
                    onSetNoteForEdit={handleSetNoteForEdit} 
                    onAdd={handleAddNote}
                    onUpdate={handleUpdateNote}
                    />
            </div>
        </div>
    )
}

export default Home