import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FrontPage = () => {
    return (
        <>
            <div className='fixed inset-0 bg-gradient-to-b from-fuchsia-800 flex flex-col'>
                <div className='text-white p-4'>
                    <Navbar>
                        <Link
                            to='/account/login'
                            className='bg-white px-4 py-1 rounded-l-full rounded-r-full
                        text-sm text-fuchsia-600 drop-shadow-xl font-semibold'>
                            Log In
                        </Link>
                    </Navbar>
                </div>
                <div className='flex h-full w-full relative'>
                    <div
                        style={{
                            backgroundImage: 'url(https://images.pexels.com/photos/161154/stained-glass-spiral-circle-pattern-161154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
                        }}
                        className='bg-cover bg-center absolute h-full w-full'
                    />
                    <div className='text-white w-full h-full text-5xl md:text-8xl bg-gradient-to-b
                from-fuchsia-800 z-10 relative break-words'>
                        <h1 className='absolute bottom-24 md:bottom-2 right-0 left-0 md:left-auto md:max-w-[600px] px-5 text-right
                   font-bold uppercase drop-shadow-2xl'>Capture moments <br /> with Snapshot</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FrontPage