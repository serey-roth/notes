import React from 'react'
import { NavLink } from 'react-router-dom'

const Notes = ({ notes }) => {
    return (
        <div className='flex flex-col w-full md:max-w-[350px] p-2 relative'>
            <div className='flex flex-col flex-1 text-gray-200 drop-shadow-2xl shadow-inner
            shadow-pink-700 rounded-lg p-2'>
                <h1 className='font-bold text-2xl border-b-2 border-dashed py-2 px-2 mb-2'>All Notes</h1>
                <div className='max-h-full overflow-auto w-full flex-1 flex flex-col gap-1'>
                    {notes?.map((note) => (
                        <NavLink
                            key={note._id}
                            to={`/home/notes/${note._id}`}
                            className='truncate text-lg pl-2 font-semibold leading-relaxed'>
                            {'+'} {note.title}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='pt-2 text-white font-semibold flex items-center gap-1'>
                <p>2022 Serey Roth</p>
                <a href='https://github.com/serey-roth/notes' target='_blank' rel='noreferrer'>Source</a>
            </div>
        </div>
    )
}

export default Notes