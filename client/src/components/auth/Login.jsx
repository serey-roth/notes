import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Login = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState({
        email: false,
        password: false,
    })

    const [visible, setVisible] = useState({
        password: false,
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

        if (formData.email && formData.password) {
            onSubmit(formData);
            return;
        }

        const error = {};
        if (!formData.email) error.email = true;
        if (!formData.password) error.password = true;

        setError(error);
    }

    const handleToggleVisibility = (name) => {
        setVisible(prevVisible => ({
            ...prevVisible,
            [name]: !prevVisible[name],
        }))
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <form
                className='flex flex-col gap-3'
                onSubmit={handleSubmit}>
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

                <button
                    type='submit'
                    className='bg-fuchsia-500 p-2 text-white rounded-md drop-shadow-md my-2'>
                    Log In
                </button>

                <div className='flex w-full items-center gap-2'>
                    <p className='w-fit'>Don't have an account?</p>
                    <Link
                        to='/account/register'
                        className='underline underline-offset-4 drop-shadow-xl'>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login