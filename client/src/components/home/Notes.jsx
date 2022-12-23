import React from 'react'
import { HiDocumentText } from 'react-icons/hi'

const Notes = ({ notes, onNoteForView }) => {
        return (
        <div className='flex flex-col w-full max-w-[350px] p-4'>
            <div className='flex flex-col flex-1 text-gray-200 drop-shadow-2xl shadow-inner
            shadow-pink-700 rounded-lg p-2'>
                <h1 className='font-bold text-2xl border-b-2 border-dashed py-2 px-2 mb-2'>All Notes</h1>
                <div className='max-h-full overflow-auto w-full flex flex-1 flex-col gap-2'>
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
        </div>
    )
}

export default Notes