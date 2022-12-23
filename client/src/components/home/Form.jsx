import React, { useEffect, useState } from 'react'
import { MdAdd, MdMenu, MdEdit } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

const initialData = {
    title: '',
    description: '',
}

const NoteViewer = ({ editedNote, onSubmit }) => {
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
        if (editedNote) setFormData(editedNote)
    }, [editedNote])

    return (
        <form
            className='flex flex-col p-2 gap-2 drop-shadow-xl flex-1
                    shadow-xl rounded-lg '
            onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                id='title'
                placeholder='Title:'
                required
                value={formData.title}
                onChange={handleChange}
                className='py-2 px-2 text-2xl appearance-none outline-none
                    border-b-2'
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
                className='px-4 py-6 leading-relaxed text-lg flex-1 appearance-none outline-none resize-none'
            />

            <div className='flex flex-col-reverse gap-1 fixed bottom-4 right-4 group h-[100px]'>
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
                    {editedNote ? <MdEdit size={20} /> : <MdAdd size={20} />}
                </button>
                <button
                    className='p-2 rounded-full bg-rose-400 text-white drop-shadow-xl shadow-gray-300
                        opacity-0 group-hover:opacity-100 delay-100 ease-in-out duration-100 fixed
                        group-hover:bottom-24 hover:animate-spin hover:drop-shadow-none'
                    type='button'
                    onClick={handleClear}>
                    <AiOutlineClear size={20} />
                </button>
            </div>
        </form>
    )
}

export default NoteViewer