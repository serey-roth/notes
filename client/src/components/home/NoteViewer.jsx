import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

import StackedButtonsGroup from './StackedButtonsGroup';

const NoteViewer = ({ id, title, description, onDeleteNote, onEditing }) => {
    return (
        <div className='flex flex-col p-2 gap-2 flex-1 m-2 absolute inset-0 drop-shadow-xl
        lg:bg-transparent bg-white rounded-lg ease-in-out duration-200'>
            <h1 className='p-2 text-2xl border-b-2 border-dashed '>{title}</h1>

            <div className='flex-1 relative'>
                <p className='px-2 py-3 absolute inset-0 whitespace-pre-wrap
                overflow-auto selection:text-fuchsia-500'>{description}</p>
                
            </div>

            <div className='fixed bottom-4 right-4'>
                <StackedButtonsGroup
                    buttonArray={[
                        {
                            name: 'add',
                            type: 'submit',
                            handleClick: onEditing,
                            icon: <MdEdit size={20} />,
                            color: 'bg-indigo-400',
                        },
                        {
                            name: 'clear',
                            type: 'button',
                            handleClick: () => onDeleteNote(id),
                            icon: <MdDelete size={20} />,
                            color: 'bg-rose-500',
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default NoteViewer