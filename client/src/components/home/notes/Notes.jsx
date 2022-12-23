import React from 'react'
import { HiDocumentText } from 'react-icons/hi'

const Notes = ({ notes, onNoteForView }) => {
        return (
        <div className='flex flex-col w-full max-w-[350px] p-4'>
            <div className='flex flex-col gap-2 mb-4 flex-1 text-gray-200'>
                {notes?.map((note) => (
                    <span
                        key={note._id}
                        className='flex items-center cursor-pointer capitalize'
                        onClick={() => onNoteForView(note)}>
                        <HiDocumentText size={20} />
                        <h3 className='truncate text-lg pl-2 font-semibold leading-relaxed'>{note.title}</h3>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Notes