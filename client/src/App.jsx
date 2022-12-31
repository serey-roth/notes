import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Auth from './pages/Auth';
import FrontPage from './pages/FrontPage';
import NotFoundPage from './pages/NotFoundPage';
import { useTokenValidation } from './utils/hooks';


function App() {
    useTokenValidation();

    return (
        <div className='w-screen min-h-screen'>
            <Routes>
                <Route path='/' element={<FrontPage />} />
                <Route path="/home/*" element={<Home />} />
                <Route path='/account/*' element={<Auth/>} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default App
