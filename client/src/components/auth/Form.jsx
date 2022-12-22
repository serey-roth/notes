import React, { useState } from 'react'

const Form = ({ login, onSubmit, onSwitchMode }) => {
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

        onSubmit(formData);
    }

    return (
        <div
        style={{ 
            display: 'grid',
            gap: '1rem',
            position: 'relative'
        }} >
            <h1>{login ? 'Log In' : 'Register'}</h1>
            <div id='googleLoginDiv'></div>
            <form
            style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }} 
            onSubmit={handleSubmit}>
                {!login && (
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

                {!login && (
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
                    {login ? 'Log In' : 'Register'}
                </button>

                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <p>{login ? "Don't have" : 'Already have'} an account?</p>
                    <button 
                    type='button'
                    onClick={onSwitchMode}
                    style={{
                        border: 0,
                        backgroundColor: 'inherit',
                        textDecoration: 'underline',
                    }}>
                        {login ? 'Register' : 'Log In'}
                    </button>
                </span>
            </form>
        </div>
    )
}

export default Form