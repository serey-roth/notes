import React, { useState } from 'react'

const UserAuth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div
        style={{ 
            display: 'grid',
            gap: '1rem',
            position: 'relative'
        }} >
            <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            <form
            style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }} 
            onSubmit={handleSubmit}>
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

                {isSignIn && (
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
            </form>
        </div>
    )
}

export default UserAuth