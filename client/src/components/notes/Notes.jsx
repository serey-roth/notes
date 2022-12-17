import React from 'react'
import { useNotesContext } from '../../context/NotesContext';
import Note from './Note'

const Notes = () => {
    const { 
        notes,
        isLoadingNotes,
        isFetchingNotes,
        isRemoving,
        isErrorRemoving,
        isErrorNotes
    } = useNotesContext();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            <h1>Notes ({notes?.length})</h1>
            {(isLoadingNotes || isFetchingNotes) && <p>Loading Notes...</p>}
            {(isErrorNotes) && <p>Error occurred when loading notes!</p>}
            {isRemoving && <p>Deleting task...</p>}
            {(isErrorRemoving) && <p>Error occurred when deleting task!</p>}
            {notes?.map((note) => (
                <Note 
                    key={note._id}
                    data={note} 
                />
            ))}
        </div>
    )
}

export default Notes