import React from 'react'

import { useLogin } from '../../utils/hooks/auth';
import { notifyPromise } from '../../utils';
import Login from './Login'

const ConnectedLogin = () => {
    const { loginAsync } = useLogin();

    const handleSubmit = async (data) => {
        try {
            const authPromise = loginAsync(data);
            notifyPromise(authPromise, 'Please wait...', 'Logged In!');
            const auth = await authPromise;
            localStorage.setItem('currentUser', JSON.stringify(auth.token));
        } catch (error) {
            console.error(error);
        } 
    }

    return (
        <Login onSubmit={handleSubmit} />
    )
}


export default ConnectedLogin