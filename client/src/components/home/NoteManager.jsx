import React, { useState } from 'react'

import { useAddNote, useUpdateNote, useDeleteNote } from '../../utils/hooks/notes';
import { notifyPromise } from '../../utils';

import NoteViewer from './NoteViewer';
import NoteEditor from './NoteEditor';
import NoteMaker from './NoteMaker';

const NoteManager = ({ viewedNote, onNoteForView, onAdd, onUpdate, onDelete }) => {
    const { addAsync } = useAddNote();
    const { updateAsync } = useUpdateNote();
    const { removeAsync } = useDeleteNote();

    const [isEditing, setIsEditing] = useState(false);

    const handleAddFormSubmit = async (data) => {
        try {
            const notePromise = addAsync(data);
            notifyPromise(notePromise, 'Adding new note...', 'Added!');
            const result = await notePromise;
            onAdd(result);
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditFormSubmit = async (data) => {
        try {
            const notePromise = updateAsync({ 
                id: viewedNote._id, 
                note: { ...viewedNote, ...data }
            });
            notifyPromise(notePromise, `Updating '${viewedNote.title}'`, 'Updated!');
            const result = await notePromise;
            onUpdate(result)
            onNoteForView(result);
            setIsEditing(false);
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
            {viewedNote ? 
                isEditing ? 
                (<NoteEditor 
                        editedNote={viewedNote}
                        onSubmit={handleEditFormSubmit}
                        onCancel={handleCancelEdit}
                    />
                ): (
                    <NoteViewer
                    id={viewedNote._id}
                    title={viewedNote.title}
                    description={viewedNote.description}
                    onDeleteNote={handleDeleteNote} 
                    onEditing={handleSetNoteForEdit}
                    />
                ) 
            : (<NoteMaker onSubmit={handleAddFormSubmit} />)}
        </div>
    )
}

export default NoteManager