import React, { useState } from 'react'
import { MdAdd, MdError } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'
import toast from 'react-hot-toast'

import StackedButtonsGroup from './StackedButtonsGroup'

const initialData = {
    title: '',
    description: '',
}

const NoteMaker = ({ onSubmit }) => {
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState({
        title: false,
        description: false,
    })

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));

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
            setFormData(initialData);
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
            className='flex flex-col p-2 gap-2 drop-shadow-xl absolute inset-0'
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
                border-b-2 rounded-lg'
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
                drop-shadow-2xl rounded-lg'
            />
            {error.description && (
                <MdError size={20} className='fixed right-4 top-20 text-red-600 animate-pulse'/>
            )}

            <div className='flex flex-col-reverse gap-1 h-[150px] fixed bottom-4 right-4'>
                <StackedButtonsGroup
                    buttonArray={[
                        {
                            name: 'add',
                            type: 'submit',
                            handleClick: handleSubmit,
                            icon: <MdAdd size={20} />,
                            color: 'bg-indigo-400',
                        },
                        {
                            name: 'clear',
                            type: 'button',
                            handleClick: handleClear,
                            icon: <AiOutlineClear size={20} />,
                            color: 'bg-amber-500',
                        }
                    ]}
                />
            </div>

        </form>
    )
}

export default NoteMaker