import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import Home from './pages/Home';
import Auth from './components/auth/ConnectedForm';
import decode from 'jwt-decode'
import { toast } from 'react-hot-toast';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        function isTokenValid() {
            const currentPath = location.pathname;
            const token = localStorage.getItem('currentUser');
            if (token) {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 < (new Date()).getTime()) {
                    localStorage.clear();
                    if (currentPath !== '/') {
                        navigate('/');
                        toast('Session expired! Please log in.');
                    }
                } else {
                    if (currentPath === '/') {
                        navigate('/home');
                        toast('Welcome back!');
                    }
                }
            } else {
                if (currentPath !== '/') {
                    navigate('/');
                    toast('Session expired! Please log in.');
                }
            }
        }
        
        isTokenValid();

        window.addEventListener('click', isTokenValid);

        return () => {
            window.removeEventListener('click', isTokenValid);
        }
    })

    return (
        <div className='w-screen min-h-screen'>
            <Routes>
                <Route path="/home/*" element={<Home />} />
                <Route path='/' element={<Auth/>} />
            </Routes>
        </div>
    )
}

export default App
