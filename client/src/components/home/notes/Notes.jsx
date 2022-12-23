import React from 'react'
import { notifyPromise } from '../../../utils';
import { useDeleteNote } from '../../../utils/hooks/notes'
import Note from './Note'

const Notes = ({ notes, onSetNoteForEdit, onDelete }) => {
    const { removeAsync } = useDeleteNote();

    const handleDeleteNote = async (id) => {
        try {
            const promise = removeAsync(id);
            notifyPromise(promise, 'Deleting', 'Deleted');
            const result = await promise;
            if (result.success) {
                onDelete(id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            <h1>Notes ({notes?.length})</h1>
            {notes?.map((note) => (
                <Note 
                    key={note._id}
                    data={note} 
                    onEdit={onSetNoteForEdit}
                    onDelete={handleDeleteNote}
                />
            ))}
        </div>
    )
}

export default Notes