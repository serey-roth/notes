import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import toast from 'react-hot-toast'

import { useNotes } from '../utils/hooks/notes'

import Notes from '../components/home/Notes'
import ConnectedNoteMaker from '../components/home/ConnectedNoteMaker'
import ConnectedNoteEditor from '../components/home/ConnectedNoteEditor'
import ConnectedNoteViewer from '../components/home/ConnectedNoteViewer'
import Navbar from '../components/Navbar'

const Home = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [noteMaker, setNoteMaker] = useState(false);

    const { data } = useNotes();

    const handleAddNote = (note) => {
        setNotes(prevNotes => [...prevNotes, note])
    }

    const handleDeleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(prevNote => prevNote._id !== id));
    }

    const handleUpdateNote = (note) => {
        setNotes(prevNotes => prevNotes.map(n => n._id === note._id.toString() ? note : n))
    }

    useEffect(() => {
        if (data) {
            setNotes(data);
        }
    }, [data])

    const handleToggleNoteMaker = () => {
        setNoteMaker(prevVisible => !prevVisible);
        navigate('/home');
    }

    const logout = () => {
        localStorage.removeItem('currentUser');
        toast('Logged out!')
        navigate('/');
    }

    return (
        <div className='flex flex-col fixed inset-0 bg-gradient-to-r from-fuchsia-400 to-rose-400/50'>
            <div className='text-white p-4'>
                <Navbar>
                    <AiOutlineFileAdd 
                        size={40} 
                        className='p-2 text-white lg:text-fuchsia-900 hover:animate-pulse cursor-pointer' 
                        onClick={handleToggleNoteMaker} />
                    <GoSignOut 
                        size={25} 
                        className='cursor-pointer text-white lg:text-fuchsia-900 hover:animate-pulse' 
                        onClick={logout} />
                </Navbar>
            </div>
            <div className='flex flex-1 relative'>
                <Notes notes={notes} />
                <Routes>
                    <Route path='' element={<ConnectedNoteMaker onAdd={handleAddNote} isVisible={noteMaker}/>} />
                    <Route path='notes/:id' element={<ConnectedNoteViewer onDelete={handleDeleteNote}/>} />
                    <Route path='notes/:id/editing' element={<ConnectedNoteEditor onUpdate={handleUpdateNote}/>} /> 
                </Routes>
                </div>
        </div>
    )
}

export default Home