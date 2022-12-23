import React from 'react'

const Note = ({ data, onEdit, onDelete }) => {
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
                        onClick={() => onEdit(data)}
                        >
                            Edit
                        </button>
                        <button type='button'
                        onClick={() => onDelete(data._id)}
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