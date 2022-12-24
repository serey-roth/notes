import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { notifyPromise } from '../../utils';
import { useDeleteNote, useNote } from '../../utils/hooks/notes';

import NoteViewer from './NoteViewer'

const ConnectedNoteViewer = ({ onDelete }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data } = useNote(id);
    const { removeAsync } = useDeleteNote();

    const handleDeleteNote = async (id) => {
        try {
            const promise = removeAsync(id);
            notifyPromise(promise, 'Deleting', 'Deleted');
            const result = await promise;
            if (result.success) {
                onDelete(id);
                navigate('/home/notes')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditNote = () => {
        navigate(`/home/notes/${id}/editing`)
    }

    return (
        <div className='flex-1 md:relative'>
            <NoteViewer
            id={data?._id}
            title={data?.title}
            description={data?.description}
            onDeleteNote={handleDeleteNote}
            onEditing={handleEditNote}
        />
        </div>
    )
}

export default ConnectedNoteViewer