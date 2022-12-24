import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdError } from 'react-icons/md'

const Form = ({ login, onSubmit, onSwitchMode }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    const [visible, setVisible] = useState({
        password: false,
        confirmPassword: false,
    })

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))

        if (!e.target.value) {
            setError(prevError => ({
                ...prevError,
                [e.target.name]: true,
            }));
        } else if (error[e.target.name]) {
            setError(prevError => ({
                ...prevError,
                [e.target.name]: false,
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email && formData.password && (
            login ||
            (!login && formData.firstName && formData.lastName && formData.confirmPassword)
        )) {
            onSubmit(formData);
            return;
        }

        const error = {};
        if (!formData.email) error.email = true;
        if (!formData.password) error.password = true;
        if (!login && !formData.firstName) error.firstName = true;
        if (!login && !formData.lastName) error.lastName = true;
        if (!login && !formData.confirmPassword) error.confirmPassword = true;

        setError(error);
    }

    const handleToggleVisibility = (name) => {
        setVisible(prevVisible => ({
            ...prevVisible,
            [name]: !prevVisible[name],
        }))
    }

    return (
        <div className='flex flex-col gap-2 p-4 w-full'>
            <h1 className='text-2xl font-sembold mb-2'>{login ? 'Log in to your account' : 'Register an account'}</h1>
            <div
                id='googleLoginDiv'
                className='w-full'></div>
            <div className='relative py-4'>
                <p className='absolute top-1 bg-white px-2 left-1/2 -translate-x-1/2'>or</p>
                <hr className='border-fuchsia-400' />
            </div>
            <form
                className='flex flex-col gap-3'
                onSubmit={handleSubmit}>
                {!login && (
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-2 relative'>
                            <label
                                htmlFor='firstName'
                                className='text-sm font-semibold'>
                                First Name
                            </label>
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                placeholder='e.g John'
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className='px-2 py-1 border-2 rounded-md outline-none appearance-none 
                                focus:ring-2 ring-fuchsia-400 duration-100 ease-in-out text-lg'
                            />
                            {error.firstName &&
                                <MdError
                                    size={20}
                                    className='text-rose-500 animate-pulse absolute right-0 drop-shadow-xl' />
                            }
                        </div>

                        <div className='flex flex-col gap-2 relative'>
                            <label
                                htmlFor='lastName'
                                className='text-sm font-semibold'>
                                Last Name
                            </label>
                            <input
                                type='text'
                                name='lastName'
                                id='lastName'
                                placeholder='e.g Doe'
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className='px-2 py-1 border-2 rounded-md outline-none appearance-none 
                                focus:ring-2 ring-fuchsia-400 duration-100 ease-in-out text-lg'
                            />
                            {error.lastName &&
                                <MdError
                                    size={20}
                                    className='text-rose-500 animate-pulse absolute right-0 drop-shadow-xl' />
                            }
                        </div>

                    </div>
                )}

                <div className='flex flex-col gap-2 relative'>
                    <label
                        htmlFor='email'
                        className='text-sm font-semibold'>
                        Email Address
                    </label>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        placeholder='e.g abc@example.com'
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className='px-2 py-1 border-2 rounded-md outline-none appearance-none 
                        focus:ring-2 ring-fuchsia-400 duration-100 ease-in-out text-lg'
                    />
                    {error.email &&
                        <MdError
                            size={20}
                            className='text-rose-500 animate-pulse absolute right-0 drop-shadow-xl' />
                    }
                </div>

                <div className='flex flex-col relative gap-2'>
                    <label
                        htmlFor='password'
                        className='text-sm font-semibold'>
                        Password
                    </label>
                    <input
                        type={visible.password ? 'text' : 'password'}
                        name='password'
                        id='password'
                        placeholder='e.g abc@example.com'
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className='px-2 py-1 border-2 rounded-md outline-none appearance-none 
                        focus:ring-2 ring-fuchsia-400 duration-100 ease-in-out text-lg'
                    />
                    <div
                        className='text-fuchsia-600 absolute w-fit top-1/2 right-2
                        drop-shadow-lg cursor-pointer'
                        onClick={() => handleToggleVisibility('password')}>
                        {visible.password ? <AiFillEyeInvisible size={25} /> : <AiFillEye size={25} />}
                    </div>
                    {error.password &&
                        <MdError
                            size={20}
                            className='text-rose-500 animate-pulse absolute right-0 drop-shadow-xl' />
                    }
                </div>

                {!login && (
                    <div className='flex flex-col gap-2 relative'>
                        <label
                            htmlFor='confirmPassword'
                            className='text-sm font-semibold'>
                            Confirm Password
                        </label>
                        <input
                            type={visible.confirmPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder='e.g abc@example.com'
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='px-2 py-1 border-2 rounded-md outline-none appearance-none 
                            focus:ring-2 ring-fuchsia-400 duration-100 ease-in-out text-lg'
                        />
                        <div
                            className='text-fuchsia-600 absolute w-fit top-1/2 right-2
                            drop-shadow-lg cursor-pointer'
                            onClick={() => handleToggleVisibility('confirmPassword')}>
                            {visible.confirmPassword ? <AiFillEyeInvisible size={25} /> : <AiFillEye size={25} />}
                        </div>
                        {error.confirmPassword &&
                            <MdError
                                size={20}
                                className='text-rose-500 animate-pulse absolute right-0 drop-shadow-xl' />
                        }
                    </div>

                )}

                <button
                    type='submit'
                    className='bg-fuchsia-500 p-2 text-white rounded-md drop-shadow-md my-2'>
                    {login ? 'Log In' : 'Register'}
                </button>

                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <p>{login ? "Don't have" : 'Already have'} an account?</p>
                    <button
                        type='button'
                        onClick={onSwitchMode}
                        className='underline text-fuchsia-900 underline-offset-4'>
                        {login ? 'Register' : 'Log In'}
                    </button>
                </span>
            </form>
        </div>
    )
}

export default Form