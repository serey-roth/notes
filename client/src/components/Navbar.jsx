import React from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go'
import { AiOutlineFileAdd } from 'react-icons/ai'

const Navbar = ({ onNoteMakerVisible }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
        toast('Logged out!')
    }

    const handleNewNote = () => {
        onNoteMakerVisible();
        navigate('/home');
    }

    return (
        <div className='flex w-full items-center gap-1 px-4'>
            <h1 className='font-bold text-2xl text-white flex-1'>Snapshot</h1>
            <AiOutlineFileAdd 
                size={40} 
                className='p-2 text-white lg:text-fuchsia-900 hover:animate-pulse cursor-pointer' 
                onClick={handleNewNote} />
            <GoSignOut 
                size={25} 
                className='cursor-pointer text-white lg:text-fuchsia-900 hover:animate-pulse' 
                onClick={logout} />
        </div>
    )
}

export default Navbar