import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFoundPage = () => {
    const logout = () => {
        localStorage.removeItem('currentUser');
        toast('Logged out!')
        navigate('/');
    }
    
    return (
        <>
            <div className='fixed inset-0 bg-gradient-to-b from-fuchsia-800 flex flex-col'>
                <div className='text-white p-4'>
                    <Navbar>
                        <div className='flex items-center gap-2'>
                            <Link
                                to='/home'
                                className='bg-white px-4 py-1 rounded-l-full rounded-r-full
                        text-sm text-fuchsia-600 drop-shadow-xl font-semibold'>
                                Home
                            </Link>
                            <button
                                type='button'
                                onClick={logout}
                                className='bg-white px-4 py-1 rounded-l-full rounded-r-full
                        text-sm text-fuchsia-600 drop-shadow-xl font-semibold'>
                                Log Out
                            </button>
                        </div>
                    </Navbar>
                </div>
                <div className='flex h-full w-full relative'>
                    <div
                        style={{
                            backgroundImage: 'url(https://images.pexels.com/photos/695644/pexels-photo-695644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
                        }}
                        className='bg-cover bg-center absolute h-full w-full'
                    />
                    <div className='text-white w-full h-full bg-gradient-to-b
                 from-fuchsia-800 z-10 relative break-words'>
                        <h1 className='absolute top-1/2 right-0 left-0 -translate-y-1/2 px-5 text-center animate-pulse
                    font-bold uppercase drop-shadow-2xl text-4xl'>Page Not Found</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NotFoundPage