import React from 'react'

import Navbar from '../components/Navbar'
import Notes from '../components/notes/Notes'
import Form from '../components/Form'
import { NotesContextProvider } from '../context/NotesContext'

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Navbar />
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)'
            }}>
                <NotesContextProvider>
                    <Notes />
                    <Form />
                </NotesContextProvider>
            </div>
        </div>
    )
}

export default Home