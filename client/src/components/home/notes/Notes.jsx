import React from 'react'
import { HiDocumentText } from 'react-icons/hi'

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
        <div className='flex flex-col w-full max-w-[350px] bg-gradient-to-br from-indigo-500 p-4
        border-r-2'>
            <div className='flex flex-col gap-2 mb-4 flex-1 text-gray-200'>
                {notes?.map((note) => (
                    <span
                        key={note._id}
                        className='flex items-center cursor-pointer capitalize'>
                        <HiDocumentText size={20} />
                        <h3 className='truncate text-lg pl-2 font-semibold leading-relaxed'>{note.title}</h3>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Notes