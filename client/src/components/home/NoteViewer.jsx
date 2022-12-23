import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

import StackedButtonsGroup from './StackedButtonsGroup';

const NoteViewer = ({ id, title, description, onDeleteNote, onEditing }) => {
    return (
        <div className='flex flex-col p-2 gap-2 flex-1'>
            <h1 className='py-2 px-2 text-2xl appearance-none outline-none drop-shadow-2xl
            border-b-2 rounded-lg bg-white'>{title}</h1>

            <p className='px-4 py-6 leading-relaxed text-lg flex-1 appearance-none outline-none resize-none
            drop-shadow-2xl rounded-lg bg-white'>{description}</p>
            
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