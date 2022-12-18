import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import { useNotesContext } from '../../context/NotesContext'

const Note = ({ data }) => {
    const { auth } = useAuthContext();
    const { onEditedNote, remove, onSuccessDelete } = useNotesContext();

    return (
        <>
            {data && (
                <div 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    padding: '0.5rem',
                }}>
                    <span style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        width: '100%',
                        gap: '0.5rem'
                    }}>
                        <h3 style={{ flex: '1' }}>{data.title}</h3>
                        <button 
                        type='button'
                        onClick={() => onEditedNote(data)}
                        >
                            Edit
                        </button>
                        <button type='button'
                        onClick={() => remove(
                            { id: data._id, token: auth.token }, 
                            { onSuccess: onSuccessDelete }
                        )}
                        >
                            Delete
                        </button>
                    </span>
                    <h5>{data.date}</h5>
                    <p>{data.description}</p>
                </div>
            )}
        </>
    )
}

export default Note