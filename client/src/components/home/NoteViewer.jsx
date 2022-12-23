import React, { useState } from 'react'
import Form from './Form';
import { useAddNote, useUpdateNote, useDeleteNote } from '../../utils/hooks/notes';
import { notifyPromise } from '../../utils';
import { MdDelete, MdEdit } from 'react-icons/md';

const NoteViewer = ({ viewedNote, onNoteForView, onAdd, onUpdate, onDelete }) => {
    const { addAsync } = useAddNote();
    const { updateAsync } = useUpdateNote();
    const { removeAsync } = useDeleteNote();

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (data) => {
        let notePromise;
        try {
            if (isEditing) {
                notePromise = updateAsync({ 
                    id: viewedNote._id, 
                    note: { ...viewedNote, ...data }
                });
            } else {
                if (viewedNote) {
                    const { title, description } = viewedNote;
                    notePromise = addAsync({ title, description })
                } else {
                    notePromise = addAsync(data);
                }
                
            }
            notifyPromise(
                notePromise,
                isEditing ?'Updating...' : 'Adding...',
                isEditing ? 'Updated!' : 'Added!'
            );
            const result = await notePromise;
            if (isEditing) {
                onUpdate(result)
                onNoteForView(result);
                setIsEditing(false);
            } else {
                onAdd(result);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteNote = async (id) => {
        try {
            const promise = removeAsync(id);
            notifyPromise(promise, 'Deleting', 'Deleted');
            const result = await promise;
            if (result.success) {
                onDelete(id);
                onNoteForView(null);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSetNoteForEdit = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    return (
        <div className='w-full h-full flex flex-col relative'>
            {viewedNote && (
                <div className='absolute z-10 top-6 right-4 text-gray-400'>
                    <button
                        className='hover:text-indigo-400 ease-in-out duration-200'
                        type='button'
                        onClick={handleSetNoteForEdit}>
                        <MdEdit size={20} />
                    </button>
                    <button
                        className='hover:text-indigo-400 ease-in-out duration-200'
                        type='button'
                        onClick={() => handleDeleteNote(viewedNote._id)}>
                        <MdDelete size={20} />
                    </button>
                </div>
            )}
            <Form onSubmit={handleSubmit} viewedNote={viewedNote} isEditing={isEditing} onCancelEdit={handleCancelEdit} />
        </div>
    )
}

export default NoteViewer