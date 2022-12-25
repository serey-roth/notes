import React from 'react'

import { useRegister } from '../../utils/hooks/auth';
import { notifyPromise } from '../../utils';
import Register from './Register'

const ConnectedRegister = () => {
    const { registerAsync } = useRegister();

    const handleSubmit = async (data) => {
        const { firstName, lastName, email, password, confirmPassword } = data;

        if (password !== confirmPassword) return;
        
        try {
            const authPromise = registerAsync({
                email,
                password,
                name: `${firstName} ${lastName}`,
            });
            notifyPromise(authPromise, 'Please wait...', 'Registered!');
            const auth = await authPromise;
            localStorage.setItem('currentUser', JSON.stringify(auth.token));
        } catch (error) {
            console.error(error);
        } 
    }

    return (
        <Register onSubmit={handleSubmit} />
    )
}


export default ConnectedRegister