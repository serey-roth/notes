import React from 'react'

const Navbar = ({ children }) => {
    return (
        <div className='flex w-full items-center gap-1'>
            <h1 className='font-bold text-2xl flex-1'>Snapshot</h1>
            {children}
        </div>
    )
}

export default Navbar