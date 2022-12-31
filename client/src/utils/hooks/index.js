import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import decode from 'jwt-decode';

const getTokenFromStorage = () => {
    return localStorage.getItem('currentUser');
}

const hasTokenExpired = (token) => {
    const decodedToken = decode(token);
    return decodedToken.exp * 1000 < (new Date()).getTime();
}

export const useTokenValidation = () => {
    const navigate = useNavigate();

    //check if token has expired
    const isTokenValid = useCallback(() => {
        const currentPath = window.location.pathname;
        const token = getTokenFromStorage();
        if (token) {
            if (hasTokenExpired(token)) {
                localStorage.clear();
                toast.error('Session expired. Please log in!');
                if (currentPath.includes('home')) {
                    navigate('/account/login');
                }
            } else {
                if (!currentPath.includes('home')) {
                    toast.success('Welcome back!');
                    navigate('/home');
                }
            }
        } else {
            if (currentPath.includes('home')) {
                toast.error('Please log in!');
                navigate('/account/login');
            }
        }
    }, []);

    useEffect(() => {   
        isTokenValid();           

        window.addEventListener('click', isTokenValid);

        return () => {
            window.removeEventListener('click', isTokenValid);
        }
    }, [window.location.pathname]);
};
