import React from 'react'
import { notifyPromise } from '../../utils';
import { useAddNote } from '../../utils/hooks/notes';

import NoteMaker from './NoteMaker';

const ConnectedNoteMaker = ({ onAdd, isVisible }) => {
    const { addAsync } = useAddNote();

    const handleSubmit = async (data) => {
        try {
            const notePromise = addAsync(data);
            notifyPromise(notePromise, 'Adding new note...', 'Added!');
            const result = await notePromise;
            onAdd(result);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={`h-full flex-1 md:relative ease-in-out duration-500
        ${isVisible ? 'opacity-100' : 'opacity-0 -z-10 md:opacity-100'}`}>
            <NoteMaker onSubmit={handleSubmit} />
        </div>
    )
}

export default ConnectedNoteMaker