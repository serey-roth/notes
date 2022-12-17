import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import UserAuth from './components/UserAuth';

function App() {
    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <Routes>
                <Route path="/notes" element={<Home />} />
                <Route index element={<UserAuth />} />
            </Routes>
        </div>
    )
}

export default App
