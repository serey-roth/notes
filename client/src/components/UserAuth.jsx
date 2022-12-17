import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const UserAuth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { 
        signIn,
        signUp,
        onSuccessAuth,
        isSigningIn,
        isSigningUp,
        isErrorSigningIn,
        isErrorSigningUp
    } = useAuthContext();

    const handleModeChange = () => {
        setIsSignIn(prevMode => !prevMode);
    }

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!isSignIn && (password !== confirmPassword)) return;
        
        if (isSignIn) {
            signIn({
                email,
                password,
            }, {
                onSuccess: onSuccessAuth,
            })
        } else {
            signUp({
                email,
                password,
                name: `${firstName} ${lastName}`,
            }, {
                onSuccess: onSuccessAuth,
            })
        }
    }

    return (
        <div
        style={{ 
            display: 'grid',
            gap: '1rem',
            position: 'relative'
        }} >
            <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            {isSigningIn && <p>Signing in. Please wait...</p>}
            {isSigningUp && <p>Signing up. Please wait...</p>}
            {isErrorSigningIn && <p>Error occurred when signing in!</p>}
            {isErrorSigningUp && <p>Error occurred when signing up!</p>}
            <a href='http://localhost:5050/auth/google'>
                Sign In via Google
            </a>
            <form
            style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }} 
            onSubmit={handleSubmit}>
                {!isSignIn && (
                    <>
                        <label htmlFor='firstName'>Title:</label>
                        <input 
                            type='text' 
                            name='firstName' 
                            id='firstName' 
                            placeholder='e.g John' 
                            required
                            value={formData.firstName}
                            onChange={handleChange} />

                        <label htmlFor='lastName'>Title:</label>
                        <input 
                            type='text' 
                            name='lastName' 
                            id='lastName' 
                            placeholder='e.g Doe' 
                            required
                            value={formData.lastName}
                            onChange={handleChange} />

                    </>
                )}
                <label htmlFor='email'>Email:</label>
                <input
                    type='text'
                    name='email' 
                    id='email'
                    placeholder='e.g abc@example.com'
                    required
                    value={formData.email}
                    onChange={handleChange} />

                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    name='password' 
                    id='password'
                    placeholder='e.g abc@example.com'
                    required
                    value={formData.password}
                    onChange={handleChange} />

                {!isSignIn && (
                    <>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        type='password'
                        name='confirmPassword' 
                        id='confirmPassword'
                        placeholder='e.g abc@example.com'
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange} /> 
                    </>
                )}
                
                <button type='submit'>
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                </button>

                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <p>{isSignIn ? "Don't have" : 'Already have'} an account?</p>
                    <button 
                    type='button'
                    onClick={handleModeChange}
                    style={{
                        border: 0,
                        backgroundColor: 'inherit',
                        textDecoration: 'underline',
                    }}>
                        {isSignIn ? 'Sign Up' : 'Sign In'}
                    </button>
                </span>
            </form>
        </div>
    )
}

export default UserAuth