import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { notifyPromise } from '../../utils';
import { useNote, useUpdateNote } from '../../utils/hooks/notes';

import NoteEditor from './NoteEditor';

const ConnectedNoteEditor = ({ onUpdate }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: note } = useNote(id);
    const { updateAsync } = useUpdateNote();

    const handleSubmit = async (data) => {
        try {
            const notePromise = updateAsync({ 
                id: note._id, 
                note: { ...note, ...data }
            });
            notifyPromise(notePromise, `Updating '${note.title}'`, 'Updated!');
            const result = await notePromise;
            onUpdate(result);
            navigate(-1);
        } catch (error) {
            console.error(error)
        }
    }

    const handleCancelEdit = () => {
        navigate(-1);
    }

    return (
        <div className='h-full flex-1 md:relative'>
            <NoteEditor
            title={note?.title}
            description={note?.description}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
        />
        </div>
        
    )
}

export default ConnectedNoteEditor