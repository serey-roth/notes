import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';

import { useLogin, useRegister, useGoogleLogin, notifyAuth } from '../../utils/hooks/auth';
import Form from './Form'

const ConnectedForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const { loginAsync } = useLogin();
    const { registerAsync } = useRegister();
    const { googleLoginAsync } = useGoogleLogin();

    const handleModeChange = () => {
        setIsLogin(prevMode => !prevMode);
    }

    const handleFormSubmit = async (data) => {
        const { firstName, lastName, email, password, confirmPassword } = data;

        if (!isLogin && (password !== confirmPassword)) return;
        
        try {
            let authPromise;
            if (isLogin) {
                authPromise = loginAsync({ email, password });
            } else {
                authPromise = registerAsync({
                    email,
                    password,
                    name: `${firstName} ${lastName}`,
                });
            }
            notifyAuth(authPromise);
            const auth = await authPromise;
            localStorage.setItem('currentUser', JSON.stringify(auth.token));
        } catch (error) {
            toast.error(error.message);
        } 
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback: async (response) => {
                try {
                    const authPromise = googleLoginAsync(response.credential)
                    notifyAuth(authPromise);
                    const auth = await authPromise;
                    localStorage.setItem('currentUser', JSON.stringify(auth.token));
                } catch (error) {
                    toast.error(error.message);
                }
            }
        })
        google.accounts.id.renderButton(
            document.getElementById('googleLoginDiv'),
            { theme: 'outline', size: 'large' }
        );
    }, [])

    return (
        <Form login={isLogin} onSubmit={handleFormSubmit} onSwitchMode={handleModeChange} />
    )
}


export default ConnectedForm