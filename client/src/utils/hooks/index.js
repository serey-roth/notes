import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import decode from 'jwt-decode';

export const useTokenValidation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const currentPath = location.pathname;

    const addTokenListener = useCallback(() => {
        window.addEventListener('click', isTokenValid);
    }, []);
    
    const removeTokenListener = useCallback(() => {
        window.removeEventListener('click', isTokenValid);
    }, []);

    //if token is expired and user is on home page
    const kickUserOut= useCallback(() => {
        toast.error('Please log in.');
        if (currentPath.includes('home')) {
            navigate('/account/login');
            removeTokenListener();
        }
    }, [currentPath]);

    //if user is at landing page and token is stild valid
    const letUserIn = useCallback(() => {
        toast.success('Welcome back!');
        if (currentPath === '/') {
            navigate('/home');
            addTokenListener();
        }
    }, [currentPath]);

    //check if token has expired
    const isTokenValid = useCallback(() => {
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
    }, [kickUserOut, letUserIn]);

    useEffect(() => {   
        isTokenValid();           

        if (currentPath.includes('home')) {
            addTokenListener();
        }

        return () => {
            removeTokenListener();
        }
    });
};
