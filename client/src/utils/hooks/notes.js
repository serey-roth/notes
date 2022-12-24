import { useQuery, useMutation } from 'react-query'
import { addNote, deleteNote, getNote, getNotes, updateNote } from '../../api'

export const useNotes = () => {
    const {
        data,
        isLoading: isObtainingNotes,
        isError: isErrorObtainingNotes,
        isSuccess: isObtained,
        error: obtainingError,
        ...rest
    } = useQuery(
        ['fetching notes'],
        getNotes,
        {
            keepPreviousData: true,
        }
    )

    return {
        data,
        isObtainingNotes,
        isErrorObtainingNotes,
        isObtained,
        obtainingError,
        ...rest
    }
}

export const useNote = (id) => {
    const {
        data,
        isLoading: isObtainingNote,
        isError: isErrorObtainingNote,
        isSuccess: isObtained,
        error: obtainingError,
        ...rest
    } = useQuery(
        ['fetching note', id],
        () => getNote(id),
        {
            keepPreviousData: true,
        }
    )

    return {
        data,
        isObtainingNote,
        isErrorObtainingNote,
        isObtained,
        obtainingError,
        ...rest
    }
}

export const useAddNote = () => {
    const { 
        mutate: add,
        mutateAsync: addAsync,
        isLoading: isAdding,
        isError:  isErrorAdding,
        isSuccess: isAdded,
        error: addError,
        ...rest
    } =  useMutation({ mutationFn: addNote });

    return {
        add,
        addAsync,
        isAdded,
        isAdding,
        isErrorAdding,
        addError,
        ...rest
    }
}

export const useDeleteNote = () => {
    const { 
        mutate: remove,
        mutateAsync: removeAsync,
        isLoading: isRemoving,
        isError:  isErrorRemoving,
        isSuccess: isRemoved,
        error: removeError,
        ...rest
    } =  useMutation({ mutationFn: deleteNote });

    return {
        remove,
        removeAsync,
        isRemoved,
        isRemoving,
        isErrorRemoving,
        removeError,
        ...rest
    }
}

export const useUpdateNote = () => {
    const { 
        mutate: update,
        mutateAsync: updateAsync,
        isLoading: isUpdating,
        isError:  isErrorUpdating,
        isSuccess: isUpdated,
        error: updateError,
        ...rest
    } =  useMutation({ mutationFn: updateNote });

    return {
        update,
        updateAsync,
        isUpdated,
        isUpdating,
        isErrorUpdating,
        updateError,
        ...rest
    }
}