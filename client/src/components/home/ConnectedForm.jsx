import React from 'react'
import Form from './Form';
import { useAddNote, useUpdateNote } from '../../utils/hooks/notes';
import { notifyPromise } from '../../utils';

const ConnectedForm = ({ editedNote, onSetNoteForEdit, onAdd, onUpdate }) => {
    const { addAsync } = useAddNote();
    const { updateAsync } = useUpdateNote();

    const handleSubmit = async (data) => {
        let notePromise;
        try {
            if (editedNote) {
                notePromise = updateAsync({ 
                    id: editedNote._id, 
                    note: { ...editedNote, ...data }
                });
            } else {
                notePromise = addAsync(data);
            }
            notifyPromise(
                notePromise,
                editedNote ?'Updating...' : 'Adding...',
                editedNote ? 'Updated!' : 'Added!'
            );
            const result = await notePromise;
            if (editedNote) {
                onUpdate(result)
                onSetNoteForEdit(null);
            } else {
                onAdd(result);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form onSubmit={handleSubmit} editedNote={editedNote} />
    )
}

export default ConnectedForm