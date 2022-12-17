import { useQuery, useMutation } from 'react-query'
import { addNote, deleteNote, getNotes, updateNote } from '../../api'

export const useNotes = (onSuccessGet, enabled=false) => {
    return useQuery(
        ['notes'],
        getNotes,
        {
            enabled,
            onSuccess: onSuccessGet,
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