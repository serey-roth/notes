import React, { useState, useEffect } from 'react'

import { useLogin, useRegister, useGoogleLogin } from '../../utils/hooks/auth';
import { notifyPromise } from '../../utils';
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
            notifyPromise(authPromise, 'Please wait...', 'Logged In!');
            const auth = await authPromise;
            localStorage.setItem('currentUser', JSON.stringify(auth.token));
        } catch (error) {
            console.error(error);
        } 
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback: async (response) => {
                try {
                    const authPromise = googleLoginAsync(response.credential)
                    notifyPromise(authPromise, 'Please wait...', 'Logged In!');
                    const auth = await authPromise;
                    localStorage.setItem('currentUser', JSON.stringify(auth.token));
                } catch (error) {
                    console.error(error.message);
                }
            }
        })
        
        const container = document.getElementById('googleLoginDiv');

        google.accounts.id.renderButton(
            container,
            { theme: 'outline', size: 'large', width: container.getBoundingClientRect().width }
        );
    }, [])

    return (
        <Form login={isLogin} onSubmit={handleFormSubmit} onSwitchMode={handleModeChange} />
    )
}


export default ConnectedForm