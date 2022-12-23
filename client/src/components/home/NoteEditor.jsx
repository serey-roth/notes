import React, { useState } from 'react'
import { MdDone, MdClose } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'
import StackedButtonsGroup from './StackedButtonsGroup'

const initialData = {
    title: '',
    description: '',
}

const NoteEditor = ({ editedNote, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(editedNote);

    console.log(formData)
    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClear = () => {
        
        setFormData(initialData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
        setFormData(initialData);
    }

    return (
        <form
            className='flex flex-col p-2 gap-2 flex-1'
            onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                id='title'
                placeholder='Title:'
                required
                value={formData.title}
                onChange={handleChange}
                className='py-2 px-2 text-2xl appearance-none outline-none drop-shadow-2xl
                border-b-2 rounded-lg shadow-inner shadow-sky-800'
            />

            <textarea
                name='description'
                id='description'
                placeholder='Capture the moment...'
                rows={20}
                cols={50}
                required
                value={formData.description}
                onChange={handleChange}
                className='px-4 py-6 leading-relaxed text-lg flex-1 appearance-none outline-none resize-none
                drop-shadow-2xl rounded-lg shadow-inner shadow-sky-800'
            />

            <div className='fixed bottom-4 right-4'>
                <StackedButtonsGroup 
                    buttonArray={[
                        {
                            name: 'edit',
                            type: 'submit',
                            handleClick: handleSubmit,
                            icon: <MdDone size={20} />,
                        }, 
                        {
                            name: 'clear',
                            type: 'button',
                            handleClick: handleClear,
                            color: 'bg-amber-500',
                            icon: <AiOutlineClear size={20} />,
                        },
                        {
                            name: 'cancel',
                            type: 'button',
                            handleClick: onCancel,
                            color: 'bg-rose-500',
                            icon: <MdClose size={20} />,
                        }
                    ]}
                />
            </div>
        </form>
    )
}

export default NoteEditor