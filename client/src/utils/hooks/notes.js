import { useQuery, useMutation } from 'react-query'
import { addNote, deleteNote, getNotes, updateNote } from '../../api'

export const useNotes = (onSuccessGet, onErrorGet, isAuthenticated) => {
    return useQuery(
        ['notes'],
        getNotes,
        {
            enabled: isAuthenticated,
            onSuccess: onSuccessGet,
            onError: onErrorGet,
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