import React, { useState } from 'react'
import { MdAdd, MdMenu } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'
import StackedButtonsGroup from './StackedButtonsGroup'

const initialData = {
    title: '',
    description: '',
}

const NoteMaker = ({ onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

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
                border-b-2 rounded-lg'
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
                drop-shadow-2xl rounded-lg'
            />

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