import { useState, useContext, createContext, useEffect, useCallback } from 'react'

import { useNotes, useAddNote, useDeleteNote, useUpdateNote } from '../utils/hooks';

const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [editedNote, setEditedNote] = useState(null);

    const { 
        data, 
        isLoading: isLoadingNotes, 
        isFetching: isFetchingNotes, 
        isError: isErrorNotes
    } = useNotes();

    const onSuccessAdd = async (note) => {
        setNotes(prevNotes => [...prevNotes, note])
    }

    const onSuccessDelete = async (result) => {
        if (result.success) {
            setNotes(prevNotes => prevNotes.filter(prevNote => prevNote._id !== result.id));
        }
    }

    const onSuccessUpdate = async (note) => {
        setNotes(prevNotes => prevNotes.map(n => n._id === note._id.toString() ? note : n))
    }

    const { 
        mutate: add, 
        isLoading: isAdding, 
        isError: isErrorAdding,
    } = useAddNote();

    const { 
        mutate: update, 
        isLoading: isUpdating, 
        isError: isErrorUpdating,
    } = useUpdateNote();

    const { 
        mutate: remove, 
        isLoading: isRemoving, 
        isError: isErrorRemoving,
    } = useDeleteNote();

    const onEditedNote = (note) => {
        setEditedNote(note);
    }
    
    useEffect(() => {
        if (data) setNotes(data);
    }, [data])

    return (
        <NoteContext.Provider value={{
            notes, 
            editedNote,
            onEditedNote,
            isAdding,
            isUpdating,
            isRemoving,
            isErrorAdding,
            isErrorRemoving,
            isErrorUpdating,
            isLoadingNotes,
            isFetchingNotes,
            isErrorNotes,
            add,
            onSuccessAdd,
            update,
            onSuccessUpdate,
            remove,
            onSuccessDelete
        }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotesContext = () => useContext(NoteContext);