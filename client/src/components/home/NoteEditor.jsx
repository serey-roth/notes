import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdDone, MdClose, MdError } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import StackedButtonsGroup from './StackedButtonsGroup'

const initialData = {
    title: '',
    description: '',
}

const NoteEditor = ({ title, description, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({ title, description });
    const [error, setError] = useState({
        title: false,
        description: false,
    })

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))

        if (e.target.value) {
            setError(prevError => ({
                ...prevError,
                [e.target.name]: false
            }))
        } else {
            setError(prevError => ({
                ...prevError,
                [e.target.name]: true
            }))
        }
    }

    const handleClear = () => {
        setFormData(initialData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.title && formData.description) {
            onSubmit(formData);
            return;
        } 

        const error = {
            title: false,
            description: false,
        }

        if (!formData.title) {
            error.title = true;
            toast.error('Title is empty!', { duration: 3000 });
        }

        if (!formData.description) {
            error.description = true;
            toast.error('Description is empty!', { duration: 3000 });
        }
        
        setError(error);
    }

    return (
        <form
            className='flex flex-col p-2 gap-2 flex-1 absolute inset-0 drop-shadow-xl'
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
            {error.title && (
                <MdError size={20} className='fixed right-4 top-4 text-red-600 animate-pulse' />
            )}

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
            {error.description && (
                <MdError size={20} className='fixed right-4 top-20 text-red-600 animate-pulse'/>
            )}

            <div className='fixed bottom-4 right-4'>
                <StackedButtonsGroup 
                    buttonArray={[
                        {
                            name: 'edit',
                            type: 'submit',
                            handleClick: handleSubmit,
                            color: 'bg-indigo-500',
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