import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Auth from './components/auth/ConnectedForm';

function App() {
    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path='/' element={<Auth/>} />
            </Routes>
        </div>
    )
}

export default App
