import React, { useEffect, useState } from 'react'
import { MdAdd, MdMenu, MdDone, MdClose } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

const initialData = {
    title: '',
    description: '',
}

const Form = ({ viewedNote, isEditing, onSubmit, onCancelEdit }) => {
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

    useEffect(() => {
        if (viewedNote) setFormData(viewedNote)
    }, [viewedNote])

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
                readOnly={!isEditing}
                value={formData.title}
                onChange={handleChange}
                className={`py-2 px-2 text-2xl appearance-none outline-none drop-shadow-2xl
                border-b-2 rounded-lg ${isEditing && 'ring-2 shadow-inner shadow-indigo-600'}`}
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
                readOnly={!isEditing}
                className={`px-4 py-6 leading-relaxed text-lg flex-1 appearance-none outline-none resize-none
                drop-shadow-2xl rounded-lg ${isEditing && 'ring-2 shadow-inner shadow-indigo-600'}`}
            />

            <div className='flex flex-col-reverse gap-1 fixed bottom-4 right-4 group h-[150px]'>
                <button
                    className='p-2 rounded-full bg-slate-400 text-white drop-shadow-xl shadow-gray-300 z-10'
                    type='button'>
                    <MdMenu size={20} />
                </button>
                <button
                    className='p-2 rounded-full bg-indigo-400 text-white drop-shadow-xl shadow-gray-300
                        opacity-0 group-hover:opacity-100 delay-75 ease-in-out duration-100 fixed group-hover:bottom-14
                        hover:animate-spin hover:drop-shadow-none'
                    type='submit'>
                    {isEditing ? <MdDone size={20} /> : <MdAdd size={20} />}
                </button>
                {(!viewedNote || isEditing) && <button
                    className='p-2 rounded-full bg-amber-400 text-white drop-shadow-xl shadow-gray-300
                        opacity-0 group-hover:opacity-100 delay-100 ease-in-out duration-100 fixed
                        group-hover:bottom-24 hover:animate-spin hover:drop-shadow-none'
                    type='button'
                    onClick={handleClear}>
                    <AiOutlineClear size={20} />
                </button>}
                {isEditing && (
                    <button
                    className='p-2 rounded-full bg-indigo-400 text-white drop-shadow-xl shadow-gray-300
                        opacity-0 group-hover:opacity-100 delay-75 ease-in-out duration-100 fixed group-hover:bottom-[8.5rem]
                        hover:animate-spin hover:drop-shadow-none'
                    type='button'
                    onClick={onCancelEdit}>
                        <MdClose size={20} />
                    </button>
                )}
            </div>
        </form>
    )
}

export default Form