import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import Home from './pages/Home';
import Auth from './pages/Auth';
import decode from 'jwt-decode'
import { toast } from 'react-hot-toast';
import FrontPage from './pages/FrontPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const currentPath = location.pathname;

        function addTokenListener() {
            window.addEventListener('click', isTokenValid);
        }
        
        function removeTokenListener() {
            window.removeEventListener('click', isTokenValid);
        }

        //if token is expired and user is on home page
        function kickUserOut() {
            if (currentPath.includes('home')) {
                navigate('/');
                toast('Session expired! Please log in.');
                removeTokenListener();
            } else {
                return;
            }
        }

        //if user is at landing page and token is stild valid
        function letUserIn() {
            if (currentPath === '/') {
                navigate('/home');
                toast('Welcome back!');
                addTokenListener();
            } else {
                return;
            }
            
        }

        //check if token has expired
        function isTokenValid() {
            const token = localStorage.getItem('currentUser');
            if (token) {
                const decodedToken = decode(token);
                const hasTokenExpired = decodedToken.exp * 1000 < (new Date()).getTime();
                if (hasTokenExpired) {
                    localStorage.clear();
                    kickUserOut();
                } else {
                    letUserIn();
                }
            } else {
                kickUserOut();
            }
        }
               
        if (location.pathname.includes('home')) {
            isTokenValid();
            addTokenListener();
        }

        return () => {
            removeTokenListener();
        }
    })

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
