import { useQuery, useMutation } from 'react-query'
import { addNote, deleteNote, getNotes, updateNote } from '../../api'

export const useNotes = (onSuccessGet, auth, isAuthenticated) => {
    return useQuery(
        ['notes', isAuthenticated, onSuccessGet, auth],
        () => getNotes(auth.token),
        {
            enabled: isAuthenticated === true && auth !== undefined,
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