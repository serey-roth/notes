import { Routes, Route } from 'react-router-dom'

import Form from './components/Form'
import Notes from './components/notes/Notes';
import UserAuth from './components/UserAuth';
import { NoteContextProvider } from './context/NotesContext';

function App() {
    return (
        <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
            <Routes>
                <Route path="/" element={
                    <NoteContextProvider>
                        <Notes />
                        <Form />
                    </NoteContextProvider>
                } />
                <Route index element={<UserAuth />} />
            </Routes>
        </div>
    )
}

export default App
