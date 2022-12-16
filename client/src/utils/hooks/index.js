import { useQuery, useMutation } from 'react-query'
import { addNote, deleteNote, getNotes, getNote, updateNote } from '../../api'

export const useNotes = () => {
    return useQuery(
        ['notes'],
        getNotes,
        {
            keepPreviousData: true,
        }
    )
}

export const useNoteById = (id) => {
    return useQuery(
        ['note', id],
        getNote,
        {
            keepPreviousData: true,
        }
    )
}

export const useAddNote = () => {
    return useMutation(addNote);
}

export const useDeleteNote = () => {
    return useMutation(deleteNote);
}

export const useUpdateNote = () => {
    return useMutation(updateNote);
}