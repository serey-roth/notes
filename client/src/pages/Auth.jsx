import React, { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ConnectedLogin from '../components/auth/ConnectedLogin';
import ConnectedRegister from '../components/auth/ConnectedRegister';
import { useGoogleLogin } from '../utils/hooks/auth';

const Auth = () => {
    const { googleLoginAsync } = useGoogleLogin();
    const googleContainer = useRef();

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

        google.accounts.id.renderButton(
            googleContainer.current,
            { theme: 'outline', size: 'large' }
        );
    }, [])

    return (
        <div className='fixed inset-0 flex flex-col bg-gradient-to-b from-fuchsia-800'>
            <div className='text-white p-4'>
                <Navbar>
                    <Link
                        to='/'
                        className='bg-white px-4 py-1 rounded-l-full rounded-r-full
                            text-sm text-fuchsia-600 drop-shadow-xl font-semibold'>
                        Home
                    </Link>
                </Navbar>
            </div>
            <div className='flex h-full w-full relative text-white'>
                <div className='pt-2 px-4 flex flex-col gap-2 w-full md:w-[350px] z-10 bg-gradient-to-bl from-fuchsia-800'>
                    <h1 className='text-2xl font-sembold mb-2'>
                        {location.pathname === '/account/login' ? 'Log in with your account' : 'Register an account'}
                    </h1>
                    <div ref={googleContainer} className='self-center max-w-full overflow-hidden'></div>
                    <hr className='my-2' />
                    <Routes>
                        <Route path='/login' element={<ConnectedLogin />} />
                        <Route path='/register' element={<ConnectedRegister />} />
                    </Routes>
                </div>
                <div 
                    style={{
                        backgroundImage: 'url(https://images.pexels.com/photos/3720778/pexels-photo-3720778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                    }}
                    className='absolute w-full h-full bg-cover bg-center'>
                </div>
            </div>
        </div>
    )
}

export default Auth