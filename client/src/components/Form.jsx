import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { useNotesContext } from '../context/NotesContext'

const initialData = {
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
}

const Form = () => {
    const { 
        editedNote, 
        onEditedNote,
        add,
        onSuccessAdd,
        update,
        onSuccessUpdate,
        isAdding,
        isUpdating,
    } = useNotesContext();

    const [formData, setFormData] = useState(initialData);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editedNote) {
            update(
                { id: editedNote._id, note: { ...editedNote, ...formData }}, 
                { onSuccess: onSuccessUpdate }
            );
            onEditedNote(null);
        } else {
            add(formData, { onSuccess: onSuccessAdd });
        }

        setFormData(initialData);
    }

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClear = () => {
        setFormData(initialData);
    }

    useEffect(() => {
        if (editedNote) setFormData(editedNote)
    }, [editedNote])

    return (
        <div
        style={{ 
            display: 'grid',
            gap: '1rem',
            position: 'relative'
        }} >
            <h1>Make a Note</h1>
            {isAdding && <p>Adding new note...</p>}
            {isUpdating && <p>Updating note...</p>}
            <form
            style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }} 
            onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input 
                    type='text' 
                    name='title' 
                    id='title' 
                    placeholder='Enter a title' 
                    required
                    value={formData.title}
                    onChange={handleChange} />

                <label htmlFor='date'>Date:</label>
                <input 
                    type='date' 
                    name='date' 
                    id='date'
                    value={formData.date}
                    required
                    onChange={handleChange} />

                <label htmlFor='description'>Description:</label>
                <textarea 
                    name='description' 
                    id='description'
                    placeholder='Enter a note'
                    rows={20}
                    cols={50}
                    required
                    value={formData.description}
                    onChange={handleChange} />

                <button 
                type='button' 
                onClick={handleClear}>
                    Clear
                </button>
                <button 
                type='submit'>
                    {editedNote ? 'Edit' : 'Add'} Note
                </button>
            </form>
        </div>
    )
}

export default Form